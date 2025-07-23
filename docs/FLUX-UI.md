# Flux UI - Livewire Component Library

Flux UI is a robust, hand-crafted UI component library for Livewire applications, built with Tailwind CSS to provide easy-to-use and customizable components.

## 🚀 Installation

### 1. Install via Composer

```bash
composer require livewire/flux
```

### 2. Configure Tailwind CSS

Add the following configuration to your `resources/css/app.css` file:

```css
@import 'tailwindcss';
@import '../../vendor/livewire/flux/dist/flux.css';
@custom-variant dark (&:where(.dark, .dark *));
```

### 3. Add Flux Directives to Layout

Include Flux directives in your main layout file:

```html
<head>
    ...
    @fluxAppearance
</head>
<body>
    ...
    @fluxScripts
</body>
```

### 4. (Optional) Load Inter Font

```html
<head>
    ...
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600&display=swap" rel="stylesheet" />
</head>
```

And configure in CSS:

```css
@theme {
    --font-sans: Inter, sans-serif;
}
```

## 🎨 Design Principles

Flux UI is built on 4 key principles:

### 1. **Simplicity**
- Easy-to-understand and use syntax
- Shorthand for commonly used components

```blade
<!-- Simple -->
<flux:input type="email" wire:model="email" label="Email" />

<!-- Expansive (when more customization is needed) -->
<flux:field>
    <flux:label>Email</flux:label>
    <flux:input wire:model="email" type="email" />
    <flux:error name="email" />
</flux:field>
```

### 2. **Brevity**
- Short and clear component names
- No long compound words

```blade
<flux:button>Options</flux:button>
<flux:input>
<flux:dropdown>
```

### 3. **Composability**
- Components can be flexibly combined
- Allows controlled complexity

```blade
<flux:dropdown>
    <flux:button>Options</flux:button>
    <flux:menu>
        <flux:menu.item>Profile</flux:menu.item>
        <flux:menu.item>Settings</flux:menu.item>
    </flux:menu>
</flux:dropdown>
```

### 4. **Consistency**
- Consistent naming patterns
- Uniform attribute usage

```blade
<flux:heading>Title</flux:heading>
<flux:menu.submenu heading="Submenu">
<flux:accordion.heading>Accordion Title</flux:accordion.heading>
```

## 📦 Core Components

### Form Components

```blade
<!-- Input Field -->
<flux:input wire:model="email" label="Email" />
<flux:input icon="magnifying-glass" placeholder="Search..." />

<!-- Textarea -->
<flux:textarea wire:model="content" label="Content" />

<!-- Select -->
<flux:select wire:model="state" label="State">
    <flux:select.option value="active">Active</flux:select.option>
    <flux:select.option value="inactive">Inactive</flux:select.option>
</flux:select>

<!-- Checkbox -->
<flux:checkbox wire:model="terms" label="Accept terms" />

<!-- Radio Group -->
<flux:radio.group wire:model="payment">
    <flux:radio value="card">Credit Card</flux:radio>
    <flux:radio value="paypal">PayPal</flux:radio>
</flux:radio.group>

<!-- Switch -->
<flux:switch wire:model="enabled" label="Enable notifications" />
```

### UI Components

```blade
<!-- Button -->
<flux:button variant="primary">Save</flux:button>
<flux:button icon="plus" variant="subtle">Add Item</flux:button>

<!-- Badge -->
<flux:badge variant="solid">New</flux:badge>
<flux:badge icon="user" variant="outline">Admin</flux:badge>

<!-- Card -->
<flux:card>
    <flux:card.header>
        <flux:heading>Card Title</flux:heading>
    </flux:card.header>
    <flux:card.body>
        Card content goes here
    </flux:card.body>
</flux:card>

<!-- Modal -->
<flux:modal>
    <flux:modal.header>
        <flux:heading>Modal Title</flux:heading>
    </flux:modal.header>
    <flux:modal.body>
        Modal content
    </flux:modal.body>
</flux:modal>
```

### Navigation Components

```blade
<!-- Tabs -->
<flux:tabs wire:model="activeTab">
    <flux:tab value="profile">Profile</flux:tab>
    <flux:tab value="account">Account</flux:tab>
    <flux:tab value="billing">Billing</flux:tab>
</flux:tabs>

<!-- Navbar -->
<flux:navbar>
    <flux:navbar.item href="/">Home</flux:navbar.item>
    <flux:navbar.item href="/about">About</flux:navbar.item>
    <flux:navbar.item href="/contact">Contact</flux:navbar.item>
</flux:navbar>

<!-- Breadcrumbs -->
<flux:breadcrumbs>
    <flux:breadcrumbs.item href="/">Home</flux:breadcrumbs.item>
    <flux:breadcrumbs.item href="/products">Products</flux:breadcrumbs.item>
    <flux:breadcrumbs.item>Current Page</flux:breadcrumbs.item>
</flux:breadcrumbs>
```

## 🌙 Dark Mode

Flux UI has built-in dark mode support with Alpine.js utilities:

### Toggle Dark Mode

```html
<!-- Simple toggle -->
<flux:button x-data x-on:click="$flux.dark = ! $flux.dark">
    Toggle Dark Mode
</flux:button>

<!-- Toggle with icon -->
<flux:button x-data x-on:click="$flux.dark = ! $flux.dark" icon="moon" variant="subtle" aria-label="Toggle dark mode" />
```

### Appearance Mode Selector

```html
<!-- Radio group for mode selection -->
<flux:radio.group x-data x-model="$flux.appearance">
    <flux:radio value="light">Light</flux:radio>
    <flux:radio value="dark">Dark</flux:radio>
    <flux:radio value="system">System</flux:radio>
</flux:radio.group>

<!-- Switch for dark mode -->
<flux:switch x-data x-model="$flux.dark" label="Dark mode" />
```

### Segmented Controls

```html
<!-- Segmented radio group -->
<flux:radio.group x-data variant="segmented" x-model="$flux.appearance">
    <flux:radio value="light" icon="sun">Light</flux:radio>
    <flux:radio value="dark" icon="moon">Dark</flux:radio>
    <flux:radio value="system" icon="computer-desktop">System</flux:radio>
</flux:radio.group>

<!-- Icon-only segmented -->
<flux:radio.group x-data variant="segmented" x-model="$flux.appearance">
    <flux:radio value="light" icon="sun" />
    <flux:radio value="dark" icon="moon" />
    <flux:radio value="system" icon="computer-desktop" />
</flux:radio.group>
```

### JavaScript Utilities

```javascript
// Get/set user's color scheme preference
$flux.appearance = 'light|dark|system'

// Get/set current dark mode state
$flux.dark = 'true|false'

// Or use global object
Flux.dark = ! Flux.dark
```

## 🎨 Theming & Customization

### Changing Base Color

```css
/* resources/css/app.css */
@theme {
  --color-zinc-50: var(--color-slate-50);
  --color-zinc-100: var(--color-slate-100);
  --color-zinc-200: var(--color-slate-200);
  --color-zinc-300: var(--color-slate-300);
  --color-zinc-400: var(--color-slate-400);
  --color-zinc-500: var(--color-slate-500);
  --color-zinc-600: var(--color-slate-600);
  --color-zinc-700: var(--color-slate-700);
  --color-zinc-800: var(--color-slate-800);
  --color-zinc-900: var(--color-slate-900);
  --color-zinc-950: var(--color-slate-950);
}
```

### Setting Accent Colors

```css
@theme {
    --color-accent: var(--color-sky-600);
    --color-accent-content: var(--color-sky-600);
    --color-accent-foreground: var(--color-white);
}

@layer theme {
    .dark {
        --color-accent: var(--color-sky-600);
        --color-accent-content: var(--color-sky-400);
        --color-accent-foreground: var(--color-white);
    }
}
```

### Using Accent Colors

```html
<!-- With CSS variables -->
<button class="bg-[var(--color-accent)] text-[var(--color-accent-foreground)]">
    Custom Button
</button>

<!-- With Tailwind utilities -->
<button class="bg-accent text-accent-foreground">
    Accent Button
</button>

<!-- Disable accent on components -->
<flux:link :accent="false">Profile</flux:link>
<flux:tab :accent="false">Profile</flux:tab>
```

### Resolving Class Conflicts

```html
<!-- Use ! modifier to override -->
<flux:button class="bg-zinc-800! hover:bg-zinc-700!">
    Override Button
</flux:button>
```

### Custom Component Styling

```css
<style>
    [data-flux-button] {
        @apply bg-zinc-800 dark:bg-zinc-400 hover:bg-zinc-700 dark:hover:bg-zinc-300;
    }
</style>
```

## 🔧 Advanced Usage

### Livewire Data Binding

```blade
<!-- Basic binding -->
<flux:input wire:model="email" />
<flux:checkbox wire:model="terms" />
<flux:switch wire:model.live="enabled" />

<!-- Group binding -->
<flux:checkbox.group wire:model="notifications">
    <flux:checkbox value="email">Email</flux:checkbox>
    <flux:checkbox value="sms">SMS</flux:checkbox>
</flux:checkbox.group>

<flux:radio.group wire:model="payment">
    <flux:radio value="card">Credit Card</flux:radio>
    <flux:radio value="paypal">PayPal</flux:radio>
</flux:radio.group>
```

### Conditional Attributes

```blade
<!-- Plain HTML -->
<input @if ($disabled) disabled @endif>

<!-- Flux components -->
<flux:input :disabled="$disabled">
```

### Slots and Icons

```blade
<!-- Icon props -->
<flux:button icon="bell" icon:variant="solid" />
<flux:input icon:trailing="x-mark" />

<!-- Slot with custom content -->
<flux:input>
    <x-slot name="iconTrailing">
        <flux:button icon="x-mark" size="sm" variant="subtle" wire:click="clear" />
    </x-slot>
</flux:input>
```

### Component Variants

```blade
<!-- Button variants -->
<flux:button variant="primary">Primary</flux:button>
<flux:button variant="subtle">Subtle</flux:button>
<flux:button variant="ghost">Ghost</flux:button>

<!-- Input variants -->
<flux:input variant="filled" />

<!-- Modal variants -->
<flux:modal variant="flyout" />

<!-- Tabs variants -->
<flux:tabs variant="segmented" />
```

### Component Sizes

```blade
<!-- Small components -->
<flux:button size="sm">Small</flux:button>
<flux:select size="sm" />
<flux:input size="sm" />

<!-- Large components -->
<flux:heading size="lg" />
<flux:badge size="lg" />
```

### Keyboard Shortcuts

```blade
<!-- Add keyboard hints -->
<flux:button kbd="⌘S">Save</flux:button>
<flux:tooltip kbd="D">Delete</flux:tooltip>
<flux:input kbd="⌘K" placeholder="Search..." />
<flux:menu.item kbd="⌘E">Edit</flux:menu.item>
```

### Tooltips

```blade
<!-- Shorthand tooltip -->
<flux:button icon="cog-6-tooth" tooltip="Settings" />

<!-- Long-form tooltip -->
<flux:tooltip content="Settings">
    <flux:button icon="cog-6-tooth" />
</flux:tooltip>
```

## 📋 Component Patterns

### Grouped Components

```blade
<!-- Item-based groups -->
<flux:accordion>
    <flux:accordion.item />
</flux:accordion>

<flux:menu>
    <flux:menu.item />
</flux:menu>

<flux:breadcrumbs>
    <flux:breadcrumbs.item />
</flux:breadcrumbs>

<!-- Stand-alone groupable -->
<flux:button.group>
    <flux:button />
</flux:button.group>

<flux:input.group>
    <flux:input />
</flux:input.group>

<flux:checkbox.group>
    <flux:checkbox />
</flux:checkbox.group>
```

### Root Field Components

```blade
<flux:field>
    <flux:label>Label</flux:label>
    <flux:description>Description</flux:description>
    <flux:error>Error message</flux:error>
</flux:field>
```

### Table Components

```blade
<flux:table>
    <flux:table.columns>
        <flux:table.column>Name</flux:table.column>
        <flux:table.column>Email</flux:table.column>
    </flux:table.columns>
    
    <flux:table.rows>
        <flux:table.row>
            <flux:table.cell>John Doe</flux:table.cell>
            <flux:table.cell>john@example.com</flux:table.cell>
        </flux:table.row>
    </flux:table.rows>
</flux:table>
```

## 📝 Publishing Components

For deep customization, you can publish components:

```bash
# Publish specific components
php artisan flux:publish

# Publish all components
php artisan flux:publish --all
```

Published components will be stored in:
```
resources/views/flux/
```

## 🔄 Updates

```bash
composer update livewire/flux livewire/flux-pro
```

After updating, clear view cache:

```bash
php artisan view:clear
```

## 🏢 Flux Pro

For additional features, activate Flux Pro:

```bash
php artisan flux:activate
```

### CI/CD Setup

For GitHub Actions:

```yaml
- name: Add Flux license
  run: composer config http-basic.composer.fluxui.dev "${{ secrets.FLUX_USERNAME }}" "${{ secrets.FLUX_LICENSE_KEY }}"
```

For environment variables:

```bash
composer config http-basic.composer.fluxui.dev "${FLUX_USERNAME}" "${FLUX_LICENSE_KEY}"
```

For Laravel Cloud:

```bash
composer config http-basic.composer.fluxui.dev your-email your-license-key
```

## 🌐 Server Configuration

### Nginx Configuration

If you encounter 404 errors for Flux assets, add this to your Nginx configuration:

```nginx
location ~ ^/flux/flux(\.min)?\.(js|css)$ {
    expires off;
    try_files $uri $uri/ /index.php?$query_string;
}
```

## 📚 Pattern Examples

### Complete Form with Validation

```blade
<form wire:submit="save">
    <div class="space-y-6">
        <flux:input wire:model="name" label="Name" />
        <flux:input wire:model="email" label="Email" type="email" />
        <flux:textarea wire:model="message" label="Message" />
        
        <div class="flex gap-4">
            <flux:button type="submit" variant="primary">
                Save
            </flux:button>
            <flux:button type="button" variant="ghost" wire:click="cancel">
                Cancel
            </flux:button>
        </div>
    </div>
</form>
```

### Dashboard Layout

```blade
<div class="min-h-screen bg-zinc-50 dark:bg-zinc-900">
    <flux:navbar class="border-b">
        <flux:navbar.item href="/">Dashboard</flux:navbar.item>
        <flux:navbar.item href="/users">Users</flux:navbar.item>
        <flux:navbar.item href="/settings">Settings</flux:navbar.item>
        
        <div class="ml-auto">
            <flux:dropdown>
                <flux:button variant="subtle" size="sm">
                    Profile
                </flux:button>
                <flux:menu>
                    <flux:menu.item>Account</flux:menu.item>
                    <flux:menu.item>Logout</flux:menu.item>
                </flux:menu>
            </flux:dropdown>
        </div>
    </flux:navbar>
    
    <main class="container mx-auto py-6">
        {{ $slot }}
    </main>
</div>
```

### Advanced Dropdown Menu

```blade
<flux:dropdown x-data align="end">
    <flux:button variant="subtle" square class="group" aria-label="Preferred color scheme">
        <flux:icon.sun x-show="$flux.appearance === 'light'" variant="mini" class="text-zinc-500 dark:text-white" />
        <flux:icon.moon x-show="$flux.appearance === 'dark'" variant="mini" class="text-zinc-500 dark:text-white" />
        <flux:icon.moon x-show="$flux.appearance === 'system' && $flux.dark" variant="mini" />
        <flux:icon.sun x-show="$flux.appearance === 'system' && ! $flux.dark" variant="mini" />
    </flux:button>
    
    <flux:menu>
        <flux:menu.item icon="sun" x-on:click="$flux.appearance = 'light'">Light</flux:menu.item>
        <flux:menu.item icon="moon" x-on:click="$flux.appearance = 'dark'">Dark</flux:menu.item>
        <flux:menu.item icon="computer-desktop" x-on:click="$flux.appearance = 'system'">System</flux:menu.item>
    </flux:menu>
</flux:dropdown>
```

### Form Layout with Spacing

```blade
<form wire:submit="createAccount">
    <div class="mb-6">
        <flux:heading>Create an account</flux:heading>
        <flux:text class="mt-2">We're excited to have you on board.</flux:text>
    </div>
    
    <flux:input class="mb-6" label="Email" wire:model="email" />
    
    <div class="mb-6 flex *:w-1/2 gap-4">
        <flux:input label="Password" wire:model="password" />
        <flux:input label="Confirm password" wire:model="password_confirmation" />
    </div>
    
    <flux:button type="submit" variant="primary">Create account</flux:button>
</form>
```

## 🔧 Upgrading to Flux v2

### Component Renames

| v1                | v2                    |
|-------------------|-----------------------|
| `flux:options`    | `flux:select.options` |
| `flux:option`     | `flux:select.option`  |
| `flux:cell`       | `flux:table.cell`     |
| `flux:columns`    | `flux:table.columns`  |
| `flux:column`     | `flux:table.column`   |
| `flux:rows`       | `flux:table.rows`     |
| `flux:row`        | `flux:table.row`      |

### Directive Changes

Replace `@fluxStyles` with `@fluxAppearance`:

```html
<head>
    ...
--  @fluxStyles
++  @fluxAppearance
</head>
```

### CSS Changes

Move accent color definitions from `tailwind.config.js` to `app.css`:

```css
/* resources/css/app.css */
@theme {
    --color-accent: var(--color-red-500);
    --color-accent-content: var(--color-red-600);
    --color-accent-foreground: var(--color-white);
}

@layer theme {
    .dark {
        --color-accent: var(--color-red-500);
        --color-accent-content: var(--color-red-400);
        --color-accent-foreground: var(--color-white);
    }
}
```

## 🔗 Resources

- **Website**: [https://fluxui.dev](https://fluxui.dev)
- **GitHub**: [https://github.com/livewire/flux](https://github.com/livewire/flux)
- **Livewire**: [https://livewire.laravel.com](https://livewire.laravel.com)
- **Tailwind CSS**: [https://tailwindcss.com](https://tailwindcss.com)

---

Flux UI provides an efficient development experience with consistent, easy-to-use, and customizable components for modern Livewire applications.