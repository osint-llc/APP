"use client"

import { useEffect, useState } from "react"

import _diskSpace from "@/resources/data/charts/disk-space.json"
import { dateFormat, dayFormat } from "@/resources/helpers"
import { CalendarDate, getLocalTimeZone, parseAbsolute } from "@internationalized/date"
import { useParams } from "next/navigation"
import type { Key } from "react-aria-components"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  Card,
  Chart,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  DateRangePicker,
  Select,
} from "ui"

interface DiskSpace {
  timestamp: string
  used: number
  remaining: number
}

const config = {
  used: {
    label: "Used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function DiskSpace() {
  const [selectedType, setSelectedType] = useState<Key>("area")
  const initialStart = new CalendarDate(2024, 9, 1)
  const initialEnd = new CalendarDate(2024, 9, 29)
  const { id } = useParams()
  const [value, setValue] = useState({ start: initialStart, end: initialEnd })
  const [filteredData, setFilteredData] = useState<DiskSpace[]>([])
  const diskSpace = _diskSpace.filter((entry) => entry.server_id === Number(id))
  const timestamps = diskSpace.map((entry) => new Date(entry.timestamp).getTime())
  const minDate = new Date(Math.min(...timestamps))
  const maxDate = new Date(Math.max(...timestamps))

  const minValue = parseAbsolute(minDate.toISOString(), getLocalTimeZone())
  const maxValue = parseAbsolute(maxDate.toISOString(), getLocalTimeZone())

  const filterDataByDateRange = (startDate: Date, endDate: Date) => {
    return diskSpace.filter((entry) => {
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
      const filtered = diskSpace.filter((entry) => {
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
          <Card.Title>Disk Space Usage</Card.Title>
          <Card.Description>
            Displays the amount of used and available disk storage across various partitions or
            drives, helping monitor storage health and prevent issues caused by running out of
            space.
          </Card.Description>
        </div>
        <div className="flex items-end justify-end gap-2">
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
          <Select
            selectedKey={selectedType}
            onSelectionChange={setSelectedType}
            aria-label="Select a chart type"
          >
            <Select.Trigger className="hidden md:flex" />
            <Select.List>
              <Select.Option id="area" textValue="area">
                Area
              </Select.Option>
              <Select.Option id="bar" textValue="bar">
                Bar
              </Select.Option>
              <Select.Option id="line" textValue="line">
                Line
              </Select.Option>
            </Select.List>
          </Select>
        </div>
      </Card.Header>
      <Card.Content>
        <Chart
          className="max-h-[200px] min-h-[200px] w-full sm:max-h-[400px] sm:min-h-[400px]"
          config={config}
        >
          {selectedType === "area" ? (
            <AreaChart accessibilityLayer data={filteredData}>
              <defs>
                <linearGradient id="fillremaining" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-remaining)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-remaining)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillused" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-used)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-used)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent labelFormatter={(value) => dateFormat(value, false)} />
                }
              />

              <Area
                dataKey="used"
                type="natural"
                fill="url(#fillused)"
                fillOpacity={0.4}
                stroke="var(--color-used)"
              />
              <Area
                dataKey="remaining"
                type="natural"
                fill="url(#fillremaining)"
                fillOpacity={0.4}
                stroke="var(--color-remaining)"
              />
            </AreaChart>
          ) : selectedType === "bar" ? (
            <BarChart accessibilityLayer data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => dayFormat(value)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="used" fill="var(--color-used)" />
              <Bar dataKey="remaining" fill="var(--color-remaining)" />
            </BarChart>
          ) : (
            <LineChart
              accessibilityLayer
              data={filteredData}
              margin={{
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
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="used"
                type="monotone"
                stroke="var(--color-used)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="remaining"
                type="monotone"
                stroke="var(--color-remaining)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </Chart>
      </Card.Content>
    </Card>
  )
}
