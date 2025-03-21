"use client"

import drivers from "@/resources/data/database-drivers.json"
import databases from "@/resources/data/databases.json"
import { getModel } from "@/resources/eloquent"
import { useFormSubmit } from "@/resources/hooks/use-form-submit"
import { Button, Card, Checkbox, CheckboxGroup, Form, Select, TextField, TimeField } from "ui"

export function CreateBackup() {
  const { loading, submit } = useFormSubmit("Backup is created successfully.")

  return (
    <Card>
      <Card.Header>
        <Card.Title>Create Backup</Card.Title>
        <Card.Description>
          Create a new backup for the database. This will create a backup of the database and store
          it in the backups folder.
        </Card.Description>
      </Card.Header>
      <Form onSubmit={submit}>
        <Card.Content className="grid gap-6 sm:grid-cols-2">
          <TextField isRequired name="name" label="Name" />
          <div className="flex gap-6">
            <Select className="flex-1" label="Frequency">
              <Select.Trigger />
              <Select.List>
                <Select.Option textValue="hourly">Hourly</Select.Option>
                <Select.Option textValue="daily">Daily</Select.Option>
                <Select.Option textValue="weekly">Weekly</Select.Option>
                <Select.Option textValue="monthly">Monthly</Select.Option>
              </Select.List>
            </Select>
            <TimeField isRequired label="Time" />
          </div>
          <Select label="Provider">
            <Select.Trigger />
            <Select.List>
              <Select.Option textValue="a-s3">Amazon S3</Select.Option>
              <Select.Option textValue="scale-way">Scale Way</Select.Option>
              <Select.Option textValue="custom-s3">Custom S3</Select.Option>
              <Select.Option textValue="dos">Digital Ocean Spaces</Select.Option>
            </Select.List>
          </Select>
          <Select label="Region">
            <Select.Trigger />
            <Select.List>
              <Select.Option textValue="a-s3">Amazon S3</Select.Option>
              <Select.Option textValue="scale-way">Scale Way</Select.Option>
              <Select.Option textValue="custom-s3">Custom S3</Select.Option>
              <Select.Option textValue="dos">Digital Ocean Spaces</Select.Option>
            </Select.List>
          </Select>
          <TextField isRequired label="Bucket" name="bucket" />
          <TextField isRequired label="Access Key" name="ak" />
          <TextField isRequired label="Secret Key" name="sk" />
          <TextField isRequired label="Notification Email" />

          <CheckboxGroup className="col-span-full" label="Select databases">
            <div className="grid gap-3 sm:grid-cols-2">
              {databases.map((item) => (
                <Checkbox
                  value={item.id.toString()}
                  label={item.name}
                  description={getModel(drivers, "id", Number(item.driver_id))?.name}
                  key={item.id}
                />
              ))}
            </div>
          </CheckboxGroup>
        </Card.Content>
        <Card.Footer>
          <Button isPending={loading} type="submit">
            Create
          </Button>
        </Card.Footer>
      </Form>
    </Card>
  )
}
