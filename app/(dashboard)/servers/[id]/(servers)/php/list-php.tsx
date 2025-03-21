"use client"

import React from "react"

import _phps from "@/resources/data/php-versions.json"
import { title, wait } from "@/resources/helpers"
import {
  IconArrowUp,
  IconCircleCheckFill,
  IconDotsHorizontal,
  IconDownload,
  IconTrash,
} from "justd-icons"
import { toast } from "sonner"
import { Badge, Button, Card, Loader, Menu, Modal, Table } from "ui"

export function ListPhp() {
  const [phps, setPhps] = React.useState(_phps.slice(0, 8))
  const [modalState, setModalState] = React.useState<"upgrade" | "install" | "uninstall" | null>(
    null,
  )
  const [currentId, setCurrentId] = React.useState<number | null>(null)
  const [loadingState, setLoadingState] = React.useState({
    upgrade: false,
    install: false,
    uninstall: false,
    makeDefault: false,
  })

  function handleSubmit(status: string) {
    setModalState(null)
    setLoadingState({
      upgrade: status === "upgrade",
      install: status === "install",
      uninstall: status === "uninstall",
      makeDefault: status === "makeDefault",
    })
    wait(5000).then(() => {
      setLoadingState({
        upgrade: false,
        install: false,
        uninstall: false,
        makeDefault: false,
      })

      if (status === "upgrade") {
        setPhps((prev) =>
          prev.map((php) => (php.id === currentId ? { ...php, patch: "available" } : php)),
        )
        toast.success("Server upgraded successfully.")
      } else if (status === "uninstall") {
        setPhps((prev) => prev.filter((php) => php.id !== currentId))
        toast.success("Repository uninstalled successfully.")
      } else if (status === "install") {
        setPhps((prev) =>
          prev.map((php) => (php.id === currentId ? { ...php, status: "installed" } : php)),
        )
        toast.success("PHP installed successfully.")
      }
    })
  }

  function handleAction(status: typeof modalState, id: number) {
    setModalState(status)
    setCurrentId(id)
  }

  function handleDefault(id: number) {
    setCurrentId(id)
    setLoadingState((prev) => ({
      ...prev,
      makeDefault: true,
    }))
    wait(3000).then(() => {
      setPhps((prev) =>
        prev.map((php) => ({
          ...php,
          default_cli: php.id === id, // currentId is the ID of the php you want to set as true
        })),
      )
      setLoadingState((prev) => ({
        ...prev,
        makeDefault: false,
      }))
      toast.success("PHP set as default successfully.")
    })
  }

  return (
    <>
      <Card>
        <Card.Header
          title="PHP"
          description="Upgrade, manage, and monitor PHP applications on your server."
        />
        <Card.Content>
          <Table aria-label="PHP">
            <Table.Header>
              <Table.Column className="w-0">ID</Table.Column>
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Default CLI</Table.Column>
              <Table.Column className="flex justify-center">Patch</Table.Column>
              <Table.Column />
            </Table.Header>

            <Table.Body renderEmptyState={() => <Table.Empty />}>
              {phps.map((php) => (
                <Table.Row key={php.id}>
                  <Table.Cell className="w-0">{php.id}</Table.Cell>
                  <Table.Cell>{php.name}</Table.Cell>
                  <Table.Cell>
                    <Badge intent={php.status === "installed" ? "primary" : "secondary"}>
                      {(loadingState.install || loadingState.uninstall) && currentId === php.id && (
                        <Loader />
                      )}
                      {loadingState.install && currentId === php.id
                        ? "Installing"
                        : loadingState.uninstall && currentId === php.id
                          ? "Uninstalling"
                          : title(php.status)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {loadingState.makeDefault && currentId === php.id ? (
                      <Badge intent="secondary">
                        <Loader /> Switching...
                      </Badge>
                    ) : php.default_cli ? (
                      <Badge>Default</Badge>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-center">
                    {php.patch === "available" ? (
                      <Badge intent={php.patch === "available" ? "success" : "warning"}>
                        {loadingState.upgrade && currentId === php.id && <Loader />}
                        {loadingState.upgrade && currentId === php.id
                          ? "Upgrading"
                          : title(php.patch)}
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <Menu>
                      <Button
                        aria-label="Open options"
                        intent="plain"
                        size="small"
                        className="-mr-1 h-6"
                      >
                        <IconDotsHorizontal />
                      </Button>
                      <Menu.Content placement="right top">
                        {!php.default_cli && php.status === "installed" && (
                          <Menu.Item onAction={() => handleDefault(php.id)}>
                            <IconCircleCheckFill />
                            Make it Default
                          </Menu.Item>
                        )}
                        {php.patch === "available" && (
                          <>
                            <Menu.Item
                              onAction={() => {
                                setModalState("upgrade")
                                setCurrentId(php.id)
                              }}
                            >
                              <IconArrowUp />
                              Upgrade
                            </Menu.Item>
                            <Menu.Separator />
                          </>
                        )}

                        <Menu.Item
                          isDanger={php.status === "installed"}
                          onAction={() =>
                            handleAction(
                              php.status === "not_installed" ? "install" : "uninstall",
                              php.id,
                            )
                          }
                        >
                          {php.status === "installed" ? <IconTrash /> : <IconDownload />}
                          {php.status === "installed" ? "Uninstall" : "Install"}
                        </Menu.Item>
                      </Menu.Content>
                    </Menu>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {modalState}
        </Card.Content>
      </Card>
      <Modal.Content
        onOpenChange={() => setModalState(null)}
        isOpen={modalState === "upgrade" || modalState === "install" || modalState === "uninstall"}
      >
        <Modal.Header
          title={
            modalState === "uninstall"
              ? "Uninstall PHP"
              : modalState === "install"
                ? "Install PHP"
                : "Upgrade PHP"
          }
          description={
            modalState === "uninstall"
              ? "Are you sure you want to uninstall PHP?"
              : modalState === "install"
                ? "Are you sure you want to uninstall PHP?"
                : "Are you sure you want to upgrade PHP?"
          }
        />
        <Modal.Footer>
          <Modal.Close onPress={() => setModalState(null)}>Cancel</Modal.Close>
          <Button
            onPress={() => handleSubmit(modalState as any)}
            isPending={loadingState.install || loadingState.uninstall || loadingState.upgrade}
            intent={
              modalState === "uninstall"
                ? "danger"
                : modalState === "install"
                  ? "primary"
                  : "primary"
            }
          >
            {modalState === "uninstall"
              ? "Uninstall"
              : modalState === "install"
                ? "Install"
                : "Upgrade"}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </>
  )
}
