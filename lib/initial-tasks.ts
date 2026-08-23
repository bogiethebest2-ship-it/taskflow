import type { Task } from "@/types/task";

export const initialTasks: Task[] = [
  {
    id: "1",
    title: "Запознай се с Next.js",
    description: "Разгледай структурата на проекта и App Router.",
    status: "done",
    priority: "medium",
  },
  {
    id: "2",
    title: "Направи компонент за задача",
    description: "Създай переизползваем TaskCard компонент.",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "3",
    title: "Добави работа с данни",
    description: "Добавяне, редактиране и промяна на задачите.",
    status: "todo",
    priority: "low",
  },
];
