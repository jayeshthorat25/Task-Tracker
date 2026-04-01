import { useMemo } from "react";

export default function useTaskStats(tasks) {
  return useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const completed = tasks.filter(t => t.status === "completed").length;

    const overdue = tasks.filter(
      t => t.due_date && new Date(t.due_date) < today && t.status !== "completed"
    ).length;

    const pending = tasks.filter(t => t.status !== "completed").length;

    const upcoming = pending - overdue;

    return {
      total: tasks.length,
      completed,
      pending,
      overdue,
      upcoming: upcoming < 0 ? 0 : upcoming, // safety check
      priorities: {
        high: tasks.filter(t => t.priority === "high").length,
        medium: tasks.filter(t => t.priority === "medium").length,
        low: tasks.filter(t => t.priority === "low").length,
      },
    };
  }, [tasks]);
}
