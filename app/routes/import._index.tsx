import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import ExcelJS from "exceljs";
import { useEffect, useState } from "react";
import { toCapitalCase } from "~/lib/util";
import { getActivities, getCategories } from "~/models";
import { importExcel } from "~/models/excel";
import { ActivityDB, CategoryDB } from "~/types";

export const loader = async () => {
  const activities = await getActivities();
  const categories = await getCategories();
  return { activities, categories };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const file = formData.get("excel");
  const password = formData.get("password");
  const activity = formData.get("activity")?.toString();
  const category = formData.get("category")?.toString();

  if (
    !(file instanceof File) ||
    !file.name ||
    file.size === 0 ||
    !file.name.endsWith(".xlsx")
  ) {
    return Response.json({ error: "Invalid File" });
  }

  if (password !== process.env.IMPORT_PASSWORD) {
    return Response.json({ error: "Invalid Password" });
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const buffer = await file.arrayBuffer();
    await workbook.xlsx.load(buffer);

    await importExcel({
      workbook: workbook,
      activity: activity,
      category: category,
    });

    return redirect("/");
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Something went wrong" });
  }
};

const Import = () => {
  const { activities, categories } = useLoaderData<{
    activities: ActivityDB;
    categories: CategoryDB;
  }>();
  const actionData = useActionData<typeof action>();

  const [activityId, setActivityId] = useState<number>();
  const [filteredCategories, setFilteredCategories] = useState<CategoryDB>([]);

  useEffect(() => {
    setFilteredCategories(
      categories.filter((c) => c.activityId === activityId)
    );
  }, [activityId, categories]);

  return (
    <div className="min-h-[82vh] flex justify-center items-center">
      <Form
        method="post"
        encType="multipart/form-data"
        className="m-auto flex flex-col gap-4 bg-white rounded-lg shadow p-4 border"
      >
        <div>
          <input
            aria-label="File upload"
            name="excel"
            type="file"
            accept=".xlsx"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="activity">Activity</label>
          <select
            id="activity"
            name="activity"
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
            value={activityId}
            defaultValue=""
            onChange={(e) => setActivityId(Number(e.target.value))}
          >
            <option value="" disabled>
              Select a Activity
            </option>
            {activities.map((a) => (
              <option value={a.id} key={a.id}>
                {toCapitalCase(a.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
            defaultValue=""
          >
            <option value="" disabled>
              Select a category
            </option>
            {filteredCategories.map((c) => (
              <option value={c.id} key={c.id}>
                {toCapitalCase(c.name)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
          />
        </div>

        {actionData && (
          <span className="mx-auto font-bold">{actionData.error}</span>
        )}

        <button
          type="submit"
          className="bg-red-500 p-4 rounded-md text-white hover:opacity-90"
        >
          Upload
        </button>
      </Form>
    </div>
  );
};

export default Import;
