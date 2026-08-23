import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

const features = [
  {
    title: "Първо важното",
    description: "Подреждам задачите според това, което наистина трябва да свърша днес.",
    accent: "bg-amber-500",
  },
  {
    title: "Ясен списък",
    description: "Всичко е на едно място, без бележки по телефона и отворени табове навсякъде.",
    accent: "bg-teal-600",
  },
  {
    title: "Видим напредък",
    description: "Отбелязвам свършеното и виждам как се движат по-големите задачи.",
    accent: "bg-rose-500",
  },
];
import TasksPage from "@/app/tasks/page";

export default function Home() {
  return <TasksPage />;
}
