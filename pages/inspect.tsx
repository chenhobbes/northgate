import React from "react";
import { Accordion } from "@/ui/components/Accordion";
import { Avatar } from "@/ui/components/Avatar";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { CopyToClipboardButton } from "@/ui/components/CopyToClipboardButton";
import { IconButton } from "@/ui/components/IconButton";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { Table } from "@/ui/components/Table";
import { TextField } from "@/ui/components/TextField";
import { TreeView } from "@/ui/components/TreeView";
import { FeatherArrowUp } from "@subframe/core";
import { FeatherEye } from "@subframe/core";
import { FeatherFileCode } from "@subframe/core";
import { FeatherFilter } from "@subframe/core";
import { FeatherGrid } from "@subframe/core";
import { FeatherImage } from "@subframe/core";
import { FeatherInfo } from "@subframe/core";
import { FeatherLayers } from "@subframe/core";
import { FeatherLayout } from "@subframe/core";
import { FeatherMaximize2 } from "@subframe/core";
import { FeatherMenu } from "@subframe/core";
import { FeatherMonitor } from "@subframe/core";
import { FeatherMousePointer } from "@subframe/core";
import { FeatherPalette } from "@subframe/core";
import { FeatherRedo } from "@subframe/core";
import { FeatherRuler } from "@subframe/core";
import { FeatherSearch } from "@subframe/core";
import { FeatherShield } from "@subframe/core";
import { FeatherSmartphone } from "@subframe/core";
import { FeatherSparkles } from "@subframe/core";
import { FeatherSquare } from "@subframe/core";
import { FeatherTable } from "@subframe/core";
import { FeatherTablet } from "@subframe/core";
import { FeatherTag } from "@subframe/core";
import { FeatherTrendingUp } from "@subframe/core";
import { FeatherType } from "@subframe/core";
import { FeatherUndo } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { FeatherZap } from "@subframe/core";
import { FeatherZoomIn } from "@subframe/core";
import { FeatherZoomOut } from "@subframe/core";

function InspectPage() {
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full items-center gap-4 border-b border-solid border-neutral-border bg-default-background px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            className="h-6 flex-none object-cover"
            src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
          />
          <span className="text-body-bold font-body-bold text-default-font">
            InspectAI
          </span>
          <Badge variant="brand">Beta</Badge>
        </div>
        <div className="flex grow shrink-0 basis-0 items-center justify-center gap-2">
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherSmartphone />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Mobile
          </Button>
          <Button
            variant="neutral-secondary"
            size="small"
            icon={<FeatherMonitor />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Desktop
          </Button>
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherTablet />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Tablet
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherEye />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Preview
          </Button>
          <Button
            variant="brand-secondary"
            size="small"
            icon={<FeatherSparkles />}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            AI Inspect
          </Button>
          <Avatar
            size="small"
            image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
          >
            A
          </Avatar>
        </div>
      </div>
      <div className="flex w-full grow shrink-0 basis-0 items-start overflow-hidden">
        <div className="flex w-60 flex-none flex-col items-start gap-3 self-stretch border-r border-solid border-neutral-border bg-default-background px-3 py-3 overflow-auto mobile:hidden">
          <TextField
            variant="filled"
            label=""
            helpText=""
            icon={<FeatherSearch />}
          >
            <TextField.Input
              placeholder="Search layers..."
              value=""
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
            />
          </TextField>
          <div className="flex w-full flex-col items-start gap-1">
            <span className="text-caption-bold font-caption-bold text-subtext-color px-2">
              LAYERS
            </span>
            <TreeView>
              <TreeView.Folder label="Page" icon={<FeatherFileCode />}>
                <TreeView.Folder label="Header" icon={<FeatherLayout />}>
                  <TreeView.Item label="Nav" icon={<FeatherMenu />} />
                  <TreeView.Item label="Button" icon={<FeatherSquare />} />
                </TreeView.Folder>
                <TreeView.Folder label="Hero" icon={<FeatherImage />}>
                  <TreeView.Item label="Heading" icon={<FeatherType />} />
                </TreeView.Folder>
                <TreeView.Folder label="Dashboard" icon={<FeatherGrid />}>
                  <TreeView.Item label="Stat Card 1" icon={<FeatherSquare />} />
                  <TreeView.Item label="Stat Card 2" icon={<FeatherSquare />} />
                  <TreeView.Item label="Stat Card 3" icon={<FeatherSquare />} />
                  <TreeView.Item
                    selected={true}
                    label="Data Table"
                    icon={<FeatherTable />}
                  />
                </TreeView.Folder>
                <TreeView.Folder label="Card Grid" icon={<FeatherGrid />}>
                  <TreeView.Folder label="Card" icon={<FeatherSquare />}>
                    <TreeView.Item label="Image" icon={<FeatherImage />} />
                    <TreeView.Item label="Title" icon={<FeatherType />} />
                    <TreeView.Item label="Badge" icon={<FeatherTag />} />
                  </TreeView.Folder>
                </TreeView.Folder>
              </TreeView.Folder>
            </TreeView>
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-center self-stretch bg-neutral-50 overflow-auto">
          <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border bg-default-background px-4 py-2">
            <div className="flex items-center gap-2">
              <IconButton
                size="small"
                icon={<FeatherZoomIn />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                size="small"
                icon={<FeatherZoomOut />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <span className="text-caption font-caption text-subtext-color">
                100%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Badge variant="brand" icon={<FeatherMousePointer />}>
                Inspect Mode
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <IconButton
                size="small"
                icon={<FeatherUndo />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                size="small"
                icon={<FeatherRedo />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
              <IconButton
                size="small"
                icon={<FeatherMaximize2 />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-4 px-6 py-6 max-w-[800px] mobile:px-3 mobile:py-3">
            <div className="flex w-full items-center gap-4 rounded-t-lg bg-default-background px-4 py-3 shadow-sm">
              <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-brand-600">
                <span className="font-['Inter'] text-[10px] font-[700] leading-[15px] text-white">
                  A
                </span>
              </div>
              <span className="text-body-bold font-body-bold text-default-font">
                Acme Dashboard
              </span>
              <div className="flex grow shrink-0 basis-0 items-center justify-end gap-3">
                <span className="text-caption font-caption text-subtext-color">
                  Overview
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Analytics
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Settings
                </span>
                <Avatar
                  size="x-small"
                  image="https://res.cloudinary.com/subframe/image/upload/v1711417514/shared/ubsk7cs5hnnaj798efej.jpg"
                >
                  U
                </Avatar>
              </div>
            </div>
            <div className="flex w-full flex-wrap items-start gap-3">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-lg bg-default-background px-4 py-3 shadow-sm">
                <span className="text-caption font-caption text-subtext-color">
                  Revenue
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  $48.2K
                </span>
                <span className="text-caption font-caption text-success-700">
                  +12.5%
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-lg bg-default-background px-4 py-3 shadow-sm">
                <span className="text-caption font-caption text-subtext-color">
                  Users
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  2,841
                </span>
                <span className="text-caption font-caption text-success-700">
                  +8.3%
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-lg bg-default-background px-4 py-3 shadow-sm">
                <span className="text-caption font-caption text-subtext-color">
                  Conversion
                </span>
                <span className="text-heading-2 font-heading-2 text-default-font">
                  3.6%
                </span>
                <span className="text-caption font-caption text-error-700">
                  -0.4%
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col items-start gap-2 rounded-lg border-2 border-dashed border-brand-500 bg-default-background shadow-sm relative">
              <div className="flex items-center gap-1 rounded-b-md bg-brand-600 px-2 py-0.5 absolute -top-0 left-3">
                <FeatherMousePointer className="text-caption font-caption text-white" />
                <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-white">
                  Table
                </span>
              </div>
              <div className="flex w-full items-center gap-2 px-4 pt-5 pb-2">
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  Recent Orders
                </span>
                <Button
                  variant="neutral-tertiary"
                  size="small"
                  icon={<FeatherFilter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Filter
                </Button>
              </div>
              <div className="flex w-full flex-col items-start overflow-hidden rounded-b-lg overflow-x-auto">
                <Table
                  header={
                    <Table.HeaderRow>
                      <Table.HeaderCell>Order</Table.HeaderCell>
                      <Table.HeaderCell>Customer</Table.HeaderCell>
                      <Table.HeaderCell>Status</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.HeaderRow>
                  }
                >
                  <Table.Row>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-subtext-color">
                        #1024
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption-bold font-caption-bold text-default-font">
                        Sarah Chen
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="success">Paid</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-default-font">
                        $249.00
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-subtext-color">
                        #1023
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption-bold font-caption-bold text-default-font">
                        James Liu
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="warning">Pending</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-default-font">
                        $89.00
                      </span>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-subtext-color">
                        #1022
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption-bold font-caption-bold text-default-font">
                        Maria Garcia
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="success">Paid</Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-caption font-caption text-default-font">
                        $512.00
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-80 flex-none flex-col items-start self-stretch border-l border-solid border-neutral-border bg-default-background overflow-auto mobile:hidden">
          <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
            <FeatherSparkles className="text-heading-3 font-heading-3 text-brand-600" />
            <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
              Inspection Panel
            </span>
            <IconButton
              size="small"
              icon={<FeatherX />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
          </div>
          <div className="flex w-full items-center border-b border-solid border-neutral-border px-4 py-3">
            <TextField
              variant="filled"
              label=""
              helpText=""
              icon={<FeatherSearch />}
            >
              <TextField.Input
                placeholder="Search specs..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
          </div>
          <div className="flex w-full flex-col items-start">
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                  <FeatherInfo className="text-body font-body text-brand-600" />
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Component Info
                  </span>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full flex-col items-start gap-3 border-b border-solid border-neutral-border px-4 py-3">
                <div className="flex w-full items-center gap-3">
                  <IconWithBackground
                    variant="brand"
                    size="medium"
                    icon={<FeatherTable />}
                  />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start">
                    <span className="text-body-bold font-body-bold text-default-font">
                      Table
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Data display component
                    </span>
                  </div>
                  <CopyToClipboardButton
                    clipboardText="Table"
                    tooltipText="Copy name"
                    onCopy={() => {}}
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2">
                    <span className="w-16 flex-none text-caption font-caption text-subtext-color">
                      Library
                    </span>
                    <Badge variant="neutral">Radix UI</Badge>
                    <Badge variant="neutral">TanStack Table</Badge>
                  </div>
                  <div className="flex w-full items-start gap-2">
                    <span className="w-16 flex-none text-caption font-caption text-subtext-color">
                      About
                    </span>
                    <span className="text-caption font-caption text-default-font">
                      A sortable, filterable data table for displaying
                      structured datasets with row actions and pagination.
                    </span>
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                  <FeatherRuler className="text-body font-body text-brand-600" />
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Design Specs
                  </span>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full flex-col items-start gap-1 border-b border-solid border-neutral-border px-4 py-3">
                <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Padding
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    0px 0px
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Cell Padding
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    12px 12px
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Border
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    1px solid neutral-200
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Header Font
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    Caption Bold / 12px
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Body Font
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    Body / 14px
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Row Height
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    48px
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-3 py-2">
                  <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                    Border Radius
                  </span>
                  <span className="text-caption-bold font-caption-bold text-default-font">
                    8px (container)
                  </span>
                </div>
              </div>
            </Accordion>
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                  <FeatherLayers className="text-body font-body text-brand-600" />
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Recommended Tech Stack
                  </span>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full flex-col items-start gap-3 border-b border-solid border-neutral-border px-4 py-3">
                <div className="flex w-full items-start gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3">
                  <IconWithBackground
                    variant="brand"
                    size="small"
                    icon={<FeatherTable />}
                  />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      TanStack Table
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Headless table library with sorting, filtering, and
                      pagination built-in.
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-start gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3">
                  <IconWithBackground
                    variant="success"
                    size="small"
                    icon={<FeatherPalette />}
                  />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      Tailwind CSS
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Utility-first CSS for rapid, consistent styling of table
                      cells and rows.
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-start gap-3 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3">
                  <IconWithBackground
                    variant="warning"
                    size="small"
                    icon={<FeatherShield />}
                  />
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      Zod
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Schema validation to ensure data integrity before
                      rendering in the table.
                    </span>
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion
              trigger={
                <div className="flex w-full items-center gap-2 border-b border-solid border-neutral-border px-4 py-3">
                  <FeatherSparkles className="text-body font-body text-brand-600" />
                  <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    AI Insights
                  </span>
                  <Badge variant="brand" icon={<FeatherZap />}>
                    Live
                  </Badge>
                  <Accordion.Chevron />
                </div>
              }
              defaultOpen={true}
            >
              <div className="flex w-full flex-col items-start gap-3 px-4 py-3">
                <div className="flex w-full items-start gap-3">
                  <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-100">
                    <FeatherSparkles className="text-caption font-caption text-brand-700" />
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-lg bg-neutral-50 px-3 py-3">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      Performance Recommendation
                    </span>
                    <span className="text-caption font-caption text-default-font">
                      This table has potential to render large datasets.
                      Consider implementing virtual scrolling with
                      @tanstack/react-virtual to maintain 60fps rendering
                      performance above 1,000 rows.
                    </span>
                    <div className="flex w-full flex-wrap items-center gap-1">
                      <Badge variant="neutral" icon={<FeatherZap />}>
                        Performance
                      </Badge>
                      <Badge variant="neutral" icon={<FeatherTrendingUp />}>
                        Scalability
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-start gap-3">
                  <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-100">
                    <FeatherSparkles className="text-caption font-caption text-brand-700" />
                  </div>
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 rounded-lg bg-neutral-50 px-3 py-3">
                    <span className="text-caption-bold font-caption-bold text-default-font">
                      Accessibility Note
                    </span>
                    <span className="text-caption font-caption text-default-font">
                      Add aria-label to the table and ensure sortable columns
                      announce sort direction. Use role=&quot;columnheader&quot;
                      for header cells.
                    </span>
                    <div className="flex w-full flex-wrap items-center gap-1">
                      <Badge variant="neutral" icon={<FeatherEye />}>
                        A11y
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2">
                  <FeatherSparkles className="text-body font-body text-subtext-color" />
                  <span className="grow shrink-0 basis-0 text-caption font-caption text-neutral-400">
                    Ask about this component...
                  </span>
                  <IconButton
                    variant="brand-primary"
                    size="small"
                    icon={<FeatherArrowUp />}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectPage;
