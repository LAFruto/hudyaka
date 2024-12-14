![Hudyaka-MMCM](/public/social-preview.png)
# hudyaka-mmcm.com

This website serves as the score and schedule tracker for **Mapúa MCM's Foundation Week 2024-2025**. 

Built using **[Remix](https://remix.run/)** + **[TypeScript](https://www.typescriptlang.org/)** + **[TailwindCSS](https://tailwindcss.com/)** + **[Prisma ORM](https://www.prisma.io/)** + **[Kysely](https://kysely.dev/)**


## Notable Features

- **Automatic Data Upload** - After each event, the team receives Excel sheets with tabulated scores. We initially considered static data upload but found it time-consuming and prone to human error. Instead, we implemented an automatic upload system for scores, with parameters for events and their subcategories. Using the **[ExcelJS](https://github.com/exceljs/exceljs)** library, we process and upload raw data directly from Excel sheets. This approach eliminates input errors and minimizes the need for data cleaning.

- **Schedule Tracking** - The event schedule is publicized to the entire institution, providing a comprehensive reference for daily activities. Our website features countdown timers for upcoming events and clear indicators for completed activities, ensuring all participants stay informed throughout the Foundation Week.
