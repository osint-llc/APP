"use client"

import { Pagination } from "ui"

export function Paginate() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
      <span className="text-muted-fg text-sm [&>strong]:font-medium [&>strong]:text-fg [&>strong]:tabular-nums">
        Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results
      </span>
      <Pagination className="flex-1 justify-end">
        <Pagination.List>
          <Pagination.Item segment="first" href="#" />
          <Pagination.Item segment="previous" href="#" />
          <Pagination.Section
            aria-label="Pagination Segment"
            className="rounded-lg border lg:hidden"
          >
            <Pagination.Item segment="label">1</Pagination.Item>
            <Pagination.Item segment="separator" />
            <Pagination.Item className="text-muted-fg" segment="label">
              10
            </Pagination.Item>
          </Pagination.Section>
          <Pagination.Section aria-label="Pagination Segment" className="hidden lg:flex">
            {[1, 2, 3, 4].map((item) => (
              <Pagination.Item key={item.toString()} isCurrent={item === 1} href="#">
                {item}
              </Pagination.Item>
            ))}
          </Pagination.Section>
          <Pagination.Item segment="next" href="#" />
          <Pagination.Item segment="last" href="#" />
        </Pagination.List>
      </Pagination>
    </div>
  )
}
