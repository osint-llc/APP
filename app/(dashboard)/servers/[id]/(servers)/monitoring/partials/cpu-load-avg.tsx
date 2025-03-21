"use client"

import { useEffect, useState } from "react"

import _cpu from "@/resources/data/charts/cpu-load-average.json"
import { dateFormat, dayFormat } from "@/resources/helpers"
import { CalendarDate, getLocalTimeZone, parseAbsolute } from "@internationalized/date"
import { useParams } from "next/navigation"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  Chart,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  DateRangePicker,
} from "ui"

interface CpuLoadAvg {
  timestamp: string
  cpu_load: number
}
const config = {
  cpu_load: {
    label: "Load Average",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function CpuLoadAvg() {
  const { id } = useParams()
  const initialStart = new CalendarDate(2024, 9, 1)
  const initialEnd = new CalendarDate(2024, 9, 29)

  const [value, setValue] = useState({ start: initialStart, end: initialEnd })
  const [filteredData, setFilteredData] = useState<CpuLoadAvg[]>([])
  const cpu = _cpu.filter((entry) => entry.server_id === Number(id))
  const timestamps = cpu.map((entry) => new Date(entry.timestamp).getTime())
  const minDate = new Date(Math.min(...timestamps))
  const maxDate = new Date(Math.max(...timestamps))

  const minValue = parseAbsolute(minDate.toISOString(), getLocalTimeZone())
  const maxValue = parseAbsolute(maxDate.toISOString(), getLocalTimeZone())

  const filterDataByDateRange = (startDate: Date, endDate: Date) => {
    return cpu.filter((entry) => {
      const entryDate = new Date(entry.timestamp)
      return entryDate >= startDate && entryDate <= endDate
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const isInvalidRange = value.end.compare(value.start) > 29
    if (isInvalidRange) {
      const defaultStartDate = initialStart.toDate(getLocalTimeZone())
      const defaultEndDate = initialEnd.toDate(getLocalTimeZone())
      setFilteredData(filterDataByDateRange(defaultStartDate, defaultEndDate))
    } else {
      const startDate = value.start.toDate(getLocalTimeZone())
      const endDate = value.end.toDate(getLocalTimeZone())
      const filtered = cpu.filter((entry) => {
        const entryDate = new Date(entry.timestamp)
        return entryDate >= startDate && entryDate <= endDate
      })

      setFilteredData(filtered)
    }
  }, [value])
  return (
    <Card>
      <Card.Header className="flex-col justify-between gap-2 md:flex-row">
        <div className="max-w-xl flex-1 space-y-1">
          <Card.Title>CPU Load Average</Card.Title>
          <Card.Description>
            Reflects the average CPU load over a specified period, offering insight into overall
            processor demand and identifying periods of high utilization or potential bottlenecks.
          </Card.Description>
        </div>
        <div className="flex items-end gap-2">
          <DateRangePicker
            minValue={minValue}
            maxValue={maxValue}
            validate={(range) =>
              range?.end.compare(range.start) > 29 ? "Maximum stay duration is 1 month." : null
            }
            value={value}
            onChange={(v) => setValue(v!)}
            aria-label="Select a date range"
          />
        </div>
      </Card.Header>
      <Card.Content className="max-h-[400px]">
        <Chart
          className="max-h-[200px] min-h-[200px] w-full sm:max-h-[400px] sm:min-h-[400px]"
          config={config}
        >
          <AreaChart
            accessibilityLayer
            data={filteredData}
            margin={{
              top: 32,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => dayFormat(value)}
            />
            <ChartTooltip
              labelFormatter={(value) => dateFormat(value, false)}
              cursor={true}
              content={
                <ChartTooltipContent formatter={(value) => `Avg Load ${value}%`} indicator="dot" />
              }
            />
            <defs>
              <linearGradient id="fillCPULoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-cpu_load)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-cpu_load)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="cpu_load"
              type="natural"
              fill="url(#fillCPULoad)"
              fillOpacity={0.4}
              stroke="var(--color-cpu_load)"
            />
          </AreaChart>
        </Chart>
      </Card.Content>
    </Card>
  )
}
