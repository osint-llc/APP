import sites from "@/resources/data/sites.json"

export function getSitesByServerId(server_id: number) {
  return sites.filter((site) => site.server_id === server_id)
}

export function countBy<T>(data: T[], key: keyof T, value: T[keyof T]): number {
  return data.filter((item) => item[key] === value).length
}

export function getModel<T extends Record<string | number, string | number>>(
  data: T[],
  key: string,
  value: string | Array<string> | number | undefined,
): T | null {
  return data.find((item) => item[key] === value) || null
}

export function getAllModelBy<T>(data: T[], filterKey: keyof T, filterValue: T[keyof T]): T[] {
  return data.filter((item) => item[filterKey] === filterValue)
}
