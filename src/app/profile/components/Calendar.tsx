"use client";
import { format, isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import axios from "axios";
import { Box, Container } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { Schedule, Sector } from "@prisma/client";

interface ScheduleExtend extends Schedule {
    sector: Sector;
}

const Calendar = ({ userId }: { userId: number }) => {
    const [schedules, setSchedules] = useState([]);
    const actualMonth = new Date().getMonth() + 1;
    const actualYear = new Date().getFullYear();
    const daysInActualMonth = new Date(actualYear, actualMonth, 0).getDate();

    useEffect(() => {
        axios.get(`/api/schedule/${userId}`).then(({ data }) => {
            const schedulesArray = Array.isArray(data.body)
                ? data.body
                : [data.body];
            setSchedules(schedulesArray);
        });
    }, [userId]);

    return (
        <Container className="md:w-4/5 mx-auto p-4 mt-4">
            <Box className="grid grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-4">
                {Array.from(Array(daysInActualMonth).keys()).map((day) => {
                    const currentDate = new Date(
                        actualYear,
                        actualMonth - 1,
                        day + 1
                    );
                    schedules.some((schedule: Schedule) => {
                        const scheduleDate = new Date(schedule.date);
                        return isSameDay(scheduleDate, currentDate);
                    });

                    return (
                        <Box
                            className="flex flex-col gap-1 h-56 border rounded-md"
                            key={day}
                        >
                            <Box
                                className={`rounded-md text-center text-[10px] py-1 px-4 font-semibold -translate-y-2 w-4/5 mx-auto border ${
                                    currentDate.getDay() === 0 ||
                                    currentDate.getDay() === 6
                                        ? "bg-destructive text-background"
                                        : "bg-secondary"
                                }`}
                            >
                                {format(currentDate, "EE", { locale: es })}{" "}
                                {format(currentDate, "dd", { locale: es })} de{" "}
                                {format(currentDate, "MMM", { locale: es })}
                            </Box>
                            <Box className="p-2 relative h-full">
                                <Box>
                                    {schedules
                                        .filter((schedule: ScheduleExtend) => {
                                            const scheduleDate = new Date(
                                                schedule.date
                                            ).setDate(
                                                new Date(
                                                    schedule.date
                                                ).getDate() + 1
                                            );
                                            return isSameDay(
                                                scheduleDate,
                                                currentDate
                                            );
                                        })
                                        .map((schedule: ScheduleExtend) => {
                                            return (
                                                <Box
                                                    className="bg-secondary text-xs rounded-md p-2 mt-1"
                                                    key={schedule.id}
                                                >
                                                    <Box className="flex flex-row justify-between">
                                                        <span>
                                                            {
                                                                schedule.sector
                                                                    .name
                                                            }
                                                        </span>
                                                        <span>
                                                            {schedule.startTime}{" "}
                                                            - {schedule.endTime}
                                                        </span>
                                                    </Box>
                                                </Box>
                                            );
                                        })}
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Container>
    );
};

export default Calendar;
