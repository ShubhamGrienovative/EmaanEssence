import { defineRouteConfig } from "@medusajs/admin-sdk"
import { BuildingStorefront, Photo, ArrowUpRightMini, Sparkles } from "@medusajs/icons"
import { Container, Heading, Text, Button, Badge } from "@medusajs/ui"

const StorefrontPage = () => {
  return (
    <div className="flex flex-col gap-y-4 p-8">
      {/* Header Container */}
      <Container className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3">
            <div className="bg-ui-bg-subtle flex h-10 w-10 items-center justify-center rounded-lg border border-ui-border-base">
              <BuildingStorefront className="text-ui-fg-subtle" />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <Heading level="h1" className="text-xl font-semibold">Storefront</Heading>
                <Badge color="green" size="small">Active</Badge>
              </div>
              <Text className="text-ui-fg-subtle text-small mt-0.5">
                Manage your storefront content, brand assets, banners, and preview settings.
              </Text>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <a
              href="http://localhost:8000"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="secondary" size="small">
                Preview Storefront
                <ArrowUpRightMini className="text-ui-fg-subtle" />
              </Button>
            </a>
          </div>
        </div>
      </Container>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hero Banners Card */}
        <Container className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-x-2 mb-2">
              <Photo className="text-ui-fg-muted" />
              <Heading level="h2" className="text-base font-medium">Hero Banners</Heading>
            </div>
            <Text className="text-ui-fg-subtle text-small">
              Configure homepage hero images, marketing banners, call-to-action buttons, and display sequences.
            </Text>
            <div className="mt-4 p-3 bg-ui-bg-subtle rounded-md border border-ui-border-base">
              <Text className="text-ui-fg-muted text-xs">
                Backed by the <code className="font-mono text-ui-fg-base">hero_image</code> table.
              </Text>
            </div>
          </div>
        </Container>

        {/* Logos & Branding Card */}
        <Container className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-x-2 mb-2">
              <Sparkles className="text-ui-fg-muted" />
              <Heading level="h2" className="text-base font-medium">Brand Assets & Logos</Heading>
            </div>
            <Text className="text-ui-fg-subtle text-small">
              Manage your header, footer, mobile, and dark theme logo variants for consistent brand presentation.
            </Text>
            <div className="mt-4 p-3 bg-ui-bg-subtle rounded-md border border-ui-border-base">
              <Text className="text-ui-fg-muted text-xs">
                Backed by the <code className="font-mono text-ui-fg-base">logo</code> table.
              </Text>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Storefront",
  icon: BuildingStorefront,
})

export default StorefrontPage
