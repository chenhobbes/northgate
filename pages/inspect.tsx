import React, { useMemo, useState } from "react";
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

type ViewportMode = "mobile" | "tablet" | "desktop";

interface LayerNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: LayerNode[];
}

const LAYER_TREE: LayerNode[] = [
  {
    id: "page",
    label: "Page",
    icon: <FeatherFileCode />,
    children: [
      {
        id: "header",
        label: "Header",
        icon: <FeatherLayout />,
        children: [
          { id: "nav", label: "Nav", icon: <FeatherMenu /> },
          { id: "header-button", label: "Button", icon: <FeatherSquare /> },
        ],
      },
      {
        id: "hero",
        label: "Hero",
        icon: <FeatherImage />,
        children: [{ id: "heading", label: "Heading", icon: <FeatherType /> }],
      },
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <FeatherGrid />,
        children: [
          { id: "stat-card-1", label: "Stat Card 1", icon: <FeatherSquare /> },
          { id: "stat-card-2", label: "Stat Card 2", icon: <FeatherSquare /> },
          { id: "stat-card-3", label: "Stat Card 3", icon: <FeatherSquare /> },
          { id: "data-table", label: "Data Table", icon: <FeatherTable /> },
        ],
      },
      {
        id: "card-grid",
        label: "Card Grid",
        icon: <FeatherGrid />,
        children: [
          {
            id: "card",
            label: "Card",
            icon: <FeatherSquare />,
            children: [
              { id: "card-image", label: "Image", icon: <FeatherImage /> },
              { id: "card-title", label: "Title", icon: <FeatherType /> },
              { id: "card-badge", label: "Badge", icon: <FeatherTag /> },
            ],
          },
        ],
      },
    ],
  },
];

const DESIGN_SPECS: { label: string; value: string }[] = [
  { label: "Padding", value: "0px 0px" },
  { label: "Cell Padding", value: "12px 12px" },
  { label: "Border", value: "1px solid neutral-200" },
  { label: "Header Font", value: "Caption Bold / 12px" },
  { label: "Body Font", value: "Body / 14px" },
  { label: "Row Height", value: "48px" },
  { label: "Border Radius", value: "8px (container)" },
];

interface Order {
  id: string;
  customer: string;
  status: "Paid" | "Pending";
  amount: string;
}

const ORDERS: Order[] = [
  { id: "#1024", customer: "Sarah Chen", status: "Paid", amount: "$249.00" },
  { id: "#1023", customer: "James Liu", status: "Pending", amount: "$89.00" },
  { id: "#1022", customer: "Maria Garcia", status: "Paid", amount: "$512.00" },
];

const VIEWPORT_CANVAS_WIDTH: Record<ViewportMode, string> = {
  mobile: "max-w-[400px]",
  tablet: "max-w-[600px]",
  desktop: "max-w-[800px]",
};

const MIN_ZOOM = 50;
const MAX_ZOOM = 200;
const ZOOM_STEP = 25;

function matchesQuery(label: string, query: string) {
  return label.toLowerCase().includes(query.trim().toLowerCase());
}

function filterLayerTree(nodes: LayerNode[], query: string): LayerNode[] {
  if (!query.trim()) {
    return nodes;
  }

  return nodes.reduce<LayerNode[]>((matches, node) => {
    const filteredChildren = node.children
      ? filterLayerTree(node.children, query)
      : undefined;

    if (matchesQuery(node.label, query) || (filteredChildren && filteredChildren.length > 0)) {
      matches.push(
        node.children ? { ...node, children: filteredChildren } : node
      );
    }

    return matches;
  }, []);
}

function renderLayerTree(
  nodes: LayerNode[],
  selectedLayerId: string | null,
  onSelectLayer: (id: string) => void
): React.ReactNode {
  return nodes.map((node) =>
    node.children ? (
      <TreeView.Folder key={node.id} label={node.label} icon={node.icon}>
        {renderLayerTree(node.children, selectedLayerId, onSelectLayer)}
      </TreeView.Folder>
    ) : (
      <TreeView.Item
        key={node.id}
        label={node.label}
        icon={node.icon}
        selected={selectedLayerId === node.id}
        onClick={() => onSelectLayer(node.id)}
      />
    )
  );
}

function InspectPage() {
  const [viewport, setViewport] = useState<ViewportMode>("desktop");
  const [zoom, setZoom] = useState(100);
  const [layerQuery, setLayerQuery] = useState("");
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>("data-table");
  const [specsQuery, setSpecsQuery] = useState("");
  const [panelOpen, setPanelOpen] = useState(true);
  const [pendingOnly, setPendingOnly] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");

  const filteredLayers = useMemo(
    () => filterLayerTree(LAYER_TREE, layerQuery),
    [layerQuery]
  );

  const filteredSpecs = useMemo(
    () => DESIGN_SPECS.filter((spec) => matchesQuery(spec.label, specsQuery)),
    [specsQuery]
  );

  const visibleOrders = pendingOnly
    ? ORDERS.filter((order) => order.status === "Pending")
    : ORDERS;

  const isTableSelected = selectedLayerId === "data-table";

  const handleAskSubmit = () => {
    if (!aiQuestion.trim()) {
      return;
    }
    setAiQuestion("");
  };

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
            variant={viewport === "mobile" ? "neutral-secondary" : "neutral-tertiary"}
            size="small"
            icon={<FeatherSmartphone />}
            onClick={() => setViewport("mobile")}
          >
            Mobile
          </Button>
          <Button
            variant={viewport === "desktop" ? "neutral-secondary" : "neutral-tertiary"}
            size="small"
            icon={<FeatherMonitor />}
            onClick={() => setViewport("desktop")}
          >
            Desktop
          </Button>
          <Button
            variant={viewport === "tablet" ? "neutral-secondary" : "neutral-tertiary"}
            size="small"
            icon={<FeatherTablet />}
            onClick={() => setViewport("tablet")}
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
              value={layerQuery}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setLayerQuery(event.target.value)
              }
            />
          </TextField>
          <div className="flex w-full flex-col items-start gap-1">
            <span className="text-caption-bold font-caption-bold text-subtext-color px-2">
              LAYERS
            </span>
            {filteredLayers.length > 0 ? (
              <TreeView>
                {renderLayerTree(filteredLayers, selectedLayerId, setSelectedLayerId)}
              </TreeView>
            ) : (
              <span className="px-2 text-caption font-caption text-subtext-color">
                No layers match &quot;{layerQuery}&quot;
              </span>
            )}
          </div>
        </div>
        <div className="flex grow shrink-0 basis-0 flex-col items-center self-stretch bg-neutral-50 overflow-auto">
          <div className="flex w-full items-center justify-between border-b border-solid border-neutral-border bg-default-background px-4 py-2">
            <div className="flex items-center gap-2">
              <IconButton
                size="small"
                icon={<FeatherZoomIn />}
                disabled={zoom >= MAX_ZOOM}
                onClick={() => setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP))}
              />
              <IconButton
                size="small"
                icon={<FeatherZoomOut />}
                disabled={zoom <= MIN_ZOOM}
                onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))}
              />
              <span className="text-caption font-caption text-subtext-color">
                {zoom}%
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
          <div
            className={`flex w-full flex-col items-start gap-4 px-6 py-6 ${VIEWPORT_CANVAS_WIDTH[viewport]} mobile:px-3 mobile:py-3`}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
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
            <div
              className={`flex w-full flex-col items-start gap-2 rounded-lg bg-default-background shadow-sm relative cursor-pointer ${
                isTableSelected
                  ? "border-2 border-dashed border-brand-500"
                  : "border border-solid border-neutral-border"
              }`}
              onClick={() => {
                setSelectedLayerId("data-table");
                setPanelOpen(true);
              }}
            >
              {isTableSelected ? (
                <div className="flex items-center gap-1 rounded-b-md bg-brand-600 px-2 py-0.5 absolute -top-0 left-3">
                  <FeatherMousePointer className="text-caption font-caption text-white" />
                  <span className="font-['Inter'] text-[10px] font-[500] leading-[15px] text-white">
                    Table
                  </span>
                </div>
              ) : null}
              <div className="flex w-full items-center gap-2 px-4 pt-5 pb-2">
                <span className="grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                  Recent Orders
                </span>
                <Button
                  variant={pendingOnly ? "brand-secondary" : "neutral-tertiary"}
                  size="small"
                  icon={<FeatherFilter />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    event.stopPropagation();
                    setPendingOnly((current) => !current);
                  }}
                >
                  {pendingOnly ? "Pending only" : "Filter"}
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
                  {visibleOrders.map((order) => (
                    <Table.Row key={order.id}>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-caption font-caption text-subtext-color">
                          {order.id}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-caption-bold font-caption-bold text-default-font">
                          {order.customer}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant={order.status === "Paid" ? "success" : "warning"}>
                          {order.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="whitespace-nowrap text-caption font-caption text-default-font">
                          {order.amount}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
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
              onClick={() => setPanelOpen(false)}
            />
          </div>
          {panelOpen ? (
            <>
              <div className="flex w-full items-center border-b border-solid border-neutral-border px-4 py-3">
                <TextField
                  variant="filled"
                  label=""
                  helpText=""
                  icon={<FeatherSearch />}
                >
                  <TextField.Input
                    placeholder="Search specs..."
                    value={specsQuery}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setSpecsQuery(event.target.value)
                    }
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
                    {filteredSpecs.length > 0 ? (
                      filteredSpecs.map((spec, index) => (
                        <div
                          key={spec.label}
                          className={`flex w-full items-center gap-2 rounded-md px-3 py-2 ${
                            index % 2 === 0 ? "bg-neutral-50" : ""
                          }`}
                        >
                          <span className="w-24 flex-none text-caption font-caption text-subtext-color">
                            {spec.label}
                          </span>
                          <span className="text-caption-bold font-caption-bold text-default-font">
                            {spec.value}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="px-3 py-2 text-caption font-caption text-subtext-color">
                        No specs match &quot;{specsQuery}&quot;
                      </span>
                    )}
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
                          Utility-first CSS for rapid, consistent styling of
                          table cells and rows.
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
                          Add aria-label to the table and ensure sortable
                          columns announce sort direction. Use
                          role=&quot;columnheader&quot; for header cells.
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
                      <input
                        className="grow shrink-0 basis-0 border-none bg-transparent text-caption font-caption text-default-font outline-none placeholder:text-neutral-400"
                        placeholder="Ask about this component..."
                        value={aiQuestion}
                        onChange={(event) => setAiQuestion(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleAskSubmit();
                          }
                        }}
                      />
                      <IconButton
                        variant="brand-primary"
                        size="small"
                        icon={<FeatherArrowUp />}
                        disabled={!aiQuestion.trim()}
                        onClick={handleAskSubmit}
                      />
                    </div>
                  </div>
                </Accordion>
              </div>
            </>
          ) : (
            <div className="flex w-full grow flex-col items-center justify-center gap-3 px-4 py-12">
              <FeatherSparkles className="text-heading-2 font-heading-2 text-subtext-color" />
              <span className="text-caption font-caption text-subtext-color">
                Inspection panel closed
              </span>
              <Button
                variant="neutral-secondary"
                size="small"
                onClick={() => setPanelOpen(true)}
              >
                Show panel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InspectPage;
