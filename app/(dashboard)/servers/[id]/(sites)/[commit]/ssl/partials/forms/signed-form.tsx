"use client"

import { useState } from "react"

import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, ComboBox, Form, Heading, TextField } from "ui"

type Country = { id: number; name: string }
type State = { id: number; name: string; country_id: number }
type City = { id: number; name: string; state_id: number }

const countries: Country[] = [
  { id: 1, name: "United States" },
  { id: 2, name: "Indonesia" },
  { id: 3, name: "India" },
  { id: 4, name: "Germany" },
  { id: 5, name: "Japan" },
  { id: 6, name: "Canada" },
  { id: 7, name: "Brazil" },
  { id: 8, name: "South Africa" },
  { id: 9, name: "Australia" },
  { id: 10, name: "England" },
]

const states: State[] = [
  // United States
  { id: 1, name: "California", country_id: 1 },
  { id: 2, name: "Texas", country_id: 1 },
  { id: 3, name: "Florida", country_id: 1 },
  { id: 4, name: "New York", country_id: 1 },
  { id: 5, name: "Illinois", country_id: 1 },
  { id: 6, name: "Pennsylvania", country_id: 1 },
  { id: 7, name: "Ohio", country_id: 1 },
  { id: 8, name: "Georgia", country_id: 1 },
  { id: 9, name: "North Carolina", country_id: 1 },
  { id: 10, name: "Michigan", country_id: 1 },

  // Indonesia
  { id: 11, name: "Jakarta", country_id: 2 },
  { id: 12, name: "West Java", country_id: 2 },
  { id: 13, name: "Central Java", country_id: 2 },
  { id: 14, name: "East Java", country_id: 2 },
  { id: 15, name: "Bali", country_id: 2 },
  { id: 16, name: "Yogyakarta", country_id: 2 },
  { id: 17, name: "West Sumatra", country_id: 2 },
  { id: 18, name: "South Sulawesi", country_id: 2 },
  { id: 19, name: "North Sumatra", country_id: 2 },
  { id: 20, name: "Banten", country_id: 2 },

  // India
  { id: 21, name: "Maharashtra", country_id: 3 },
  { id: 22, name: "Karnataka", country_id: 3 },
  { id: 23, name: "Tamil Nadu", country_id: 3 },
  { id: 24, name: "Uttar Pradesh", country_id: 3 },
  { id: 25, name: "Kerala", country_id: 3 },
  { id: 26, name: "Gujarat", country_id: 3 },
  { id: 27, name: "Punjab", country_id: 3 },
  { id: 28, name: "Haryana", country_id: 3 },
  { id: 29, name: "Rajasthan", country_id: 3 },
  { id: 30, name: "West Bengal", country_id: 3 },

  // Germany
  { id: 31, name: "Bavaria", country_id: 4 },
  { id: 32, name: "Berlin", country_id: 4 },
  { id: 33, name: "North Rhine-Westphalia", country_id: 4 },
  { id: 34, name: "Hamburg", country_id: 4 },
  { id: 35, name: "Hesse", country_id: 4 },
  { id: 36, name: "Saxony", country_id: 4 },
  { id: 37, name: "Bremen", country_id: 4 },
  { id: 38, name: "Saarland", country_id: 4 },
  { id: 39, name: "Thuringia", country_id: 4 },
  { id: 40, name: "Rhineland-Palatinate", country_id: 4 },

  // Brazil
  { id: 41, name: "São Paulo", country_id: 7 },
  { id: 42, name: "Rio de Janeiro", country_id: 7 },
  { id: 43, name: "Bahia", country_id: 7 },
  { id: 44, name: "Minas Gerais", country_id: 7 },
  { id: 45, name: "Paraná", country_id: 7 },
  { id: 46, name: "Pernambuco", country_id: 7 },
  { id: 47, name: "Santa Catarina", country_id: 7 },
  { id: 48, name: "Rio Grande do Sul", country_id: 7 },
  { id: 49, name: "Ceará", country_id: 7 },
  { id: 50, name: "Amazonas", country_id: 7 },

  // England
  { id: 51, name: "Greater London", country_id: 10 },
  { id: 52, name: "Manchester", country_id: 10 },
  { id: 53, name: "West Midlands", country_id: 10 },
  { id: 54, name: "South Yorkshire", country_id: 10 },
  { id: 55, name: "West Yorkshire", country_id: 10 },
  { id: 56, name: "Merseyside", country_id: 10 },
  { id: 57, name: "Kent", country_id: 10 },
  { id: 58, name: "Essex", country_id: 10 },
  { id: 59, name: "Lancashire", country_id: 10 },
  { id: 60, name: "Tyne and Wear", country_id: 10 },
]

const cities: City[] = [
  ...states.flatMap((state) =>
    Array.from({ length: 10 }, (_, i) => ({
      id: state.id * 10 + i + 1,
      name: `${state.name} City ${i + 1}`,
      state_id: state.id,
    })),
  ),
]

export function SignedForm() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedState, setSelectedState] = useState<State | null>(null)
  const { submit, loading } = useFormSubmit("SSL Certificate was successfully installed.")
  // Filter states based on selected country
  const filteredStates = selectedCountry
    ? states.filter((state) => state.country_id === selectedCountry.id)
    : []

  // Filter cities based on selected state
  const filteredCities = selectedState
    ? cities.filter((city) => city.state_id === selectedState.id)
    : []

  return (
    <Form onSubmit={submit} className="space-y-6">
      <Heading level={3}>Signed Certificate</Heading>
      <div className="grid gap-6 md:grid-cols-3">
        <TextField label="Domain" placeholder="example.com" isRequired />
        <TextField label="Alternative Names" isRequired />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {" "}
        {/* Country Selection */}
        <ComboBox
          label="Country"
          isRequired
          selectedKey={selectedCountry?.id}
          onSelectionChange={(id: any) => {
            const country = countries.find((c) => c.id === id) || null
            setSelectedCountry(country)
            setSelectedState(null) // Reset state when country changes
          }}
        >
          <ComboBox.Input />
          <ComboBox.List items={countries}>
            {(item) => (
              <ComboBox.Option key={item.id} id={item.id}>
                {item.name}
              </ComboBox.Option>
            )}
          </ComboBox.List>
        </ComboBox>
        {/* State Selection */}
        {selectedCountry && (
          <ComboBox
            label="State"
            isRequired
            onSelectionChange={(id: any) => {
              const state = filteredStates.find((s) => s.id === Number(id)) || null
              setSelectedState(state)
            }}
            selectedKey={selectedState?.id}
          >
            <ComboBox.Input />
            <ComboBox.List items={filteredStates}>
              {(item) => (
                <ComboBox.Option key={item.id} id={item.id}>
                  {item.name}
                </ComboBox.Option>
              )}
            </ComboBox.List>
          </ComboBox>
        )}
        {/* City Selection */}
        {selectedState && (
          <ComboBox label="City" isRequired>
            <ComboBox.Input />
            <ComboBox.List items={filteredCities}>
              {(item) => (
                <ComboBox.Option key={item.id} id={item.id}>
                  {item.name}
                </ComboBox.Option>
              )}
            </ComboBox.List>
          </ComboBox>
        )}
      </div>

      <Button type="submit" isPending={loading}>
        {loading ? "Installing" : "Install"}
      </Button>
    </Form>
  )
}
