import { Form } from "@remix-run/react";

import { useForm } from "react-hook-form";

const Ncvj4fu3e3 = () => {
  const { register } = useForm();

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Form
        method="post"
        action="/a/upload"
        encType="multipart/form-data"
        className="m-auto flex flex-col gap-4 bg-white rounded-lg shadow p-4 border"
      >
        <input type="file" name="excel" required/>
        <div className="flex flex-col">
          <label htmlFor="func">Select Activity</label>

          <select
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
            defaultValue=""
            {...register("activity", { required: true })}
            name="activity"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="1">Blue</option>
            <option value="2">Red</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="func">Select Category</label>

          <select
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
            defaultValue=""
            {...register("activity", { required: true })}
            name="activity"
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="1">Blue</option>
            <option value="2">Red</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            {...register("password", { required: true })}
            name="password"
            className="bg-gray-200 mt-0.5 px-2 py-0.5"
          />
        </div>

        <button className="bg-red-500 p-4 rounded-md  text-white hover:opacity-90">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Ncvj4fu3e3;
