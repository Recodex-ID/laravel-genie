## Livewire Best Practices

This repository is a curated list of general recommendations on how to use [Laravel Livewire framework](https://github.com/livewire/livewire) to meet enterprise concerns regarding security, performance, and maintenance of Livewire components.

---
### 🌳 Always set up the root element
Livewire requires a root element (div) in each component. You should always write code inside `<div>Your Code Here</div>`. Omitting this structure will lead to a lot of problems with updating components.

### 🌳 Always set up root element

:x: Bad:
```html
<h1>Component Name</h1>
<div class="content">Content</div>
```

:heavy_check_mark: Good:
```html
<div>
    <h1>Component Name</h1>
    <div class="content">Content</div>
</div>
```

---
### ✨ The Golden rule of performant Livewire
```html
Don't pass large objects to Livewire components!
```

Avoid passing objects to the component's public properties if possible. Use primitive types: strings, integers, arrays, etc. That's because Livewire serializes/deserializes your component's payload with each request to the server to share the state between the frontend & backend. If you need to work on objects, you can create them inside a method or computed property, and then return the result of the processing.

What to consider a large object?
- Any instance as large as the Eloquent model is big enough already for Livewire to slow down the component lifecycle, which may lead to poor performance on live updates. For example, if you have a component representing the user profile (email and username), pass these parameters to properties as strings.

Note: if you use [full-page components](https://livewire.laravel.com/docs/components#full-page-components), it's recommended to fetch objects in the full-page component itself, and then pass them downstairs to the nested ones as primitive types.

---
### 🧵 Keep component nesting level at 1
If you had a Livewire component (0) that includes another Livewire component (1), then you shouldn't nest it deeper (2+). Too much nesting can make a headache when dealing with DOM diffing issues.

Also, prefer the usage of Blade components when you use nesting, they will be able to communicate with the parent's Livewire component but won't have the overhead the Livewire adds.

### 🧵 Keep component nesting level at 1

Example:
```html
<div> <!–– level 0 ––>
    <h1>Component</h1>
    <livewire:profile :user="auth()->user()->uuid" /> <!–– level 1 ––>
</div> 
```

---
### 📝 Utilize the form objects
Livewire v3 introduced a new abstraction layer called `Form Objects`. Always use them because that makes your components more maintainable in the long run.

[Docs](https://livewire.laravel.com/docs/forms)

---
### 🕵️ Don't pass sensitive data to the components
Avoid situations that may lead to passing sensitive data to the Livewire components, because it can be easily accessed from the client-side by default. You can hide the properties from the frontend using `#[Locked]` attribute starting from Livewire version 3.

---
### ☔ Prefer to use event listeners over polling
Instead of constantly [polling](https://livewire.laravel.com/docs/polling) the page to refresh your data, you may use [event listeners](https://livewire.laravel.com/docs/events#listening-for-events) to perform the component update only after a specific task was initiated from another component.

### ☔ Prefer to use event listeners over polling

:x: Bad:
```html
<div wire:poll>
    User Content
</div>
```

:heavy_check_mark: Good:

*Define the listener in the component using `On` attribute:*
```php
class Dashboard extends Component
{
    #[On('post-created')] 
    public function updatePostList($title)
    {
        // ...
    }
}
```

*Dispatch the event in every other component:*
```php
$this->dispatch('post-created'); 
```

---
### 📦 Use computed properties to access the database
You can use [computed properties](https://livewire.laravel.com/docs/computed-properties) to avoid unnecessary database queries. Computed properties are cached within the component's lifecycle and do not run multiple times in the component class or the blade view. Starting from Livewire v3, the result of computed properties can also be cached in the generic application-level cache (for example Redis), [see](https://livewire.laravel.com/docs/computed-properties#caching-between-requests).

### 📦 Use computed properties to access database

:x: Bad:
```php
public function countries(): Collection
{
    return Country::select('name', 'code')
        ->orderBy('name')
        ->get();
}
```

:heavy_check_mark: Good:
```php
#[Computed]
public function countries(): Collection
{
    return Country::select('name', 'code')
        ->orderBy('name')
        ->get();
}
```

---
### 🗺️ Use Route Model Binding to fetch the model
Pass only an ID or UUID to the `mount` method, then map the model attributes to component properties. Remember: don't assign a whole model, but its attributes only. To avoid manually mapping model attributes, you can use the `fill` method.

### 🗺️ Use Route Model Binding to fetch the model

Example `mount`:

```php
public function mount(User $user): void
{
    $this->fill($user);
}
```

:x: Bad:
```html
<livewire:profile :user="auth()->user()" /> 
```

:heavy_check_mark: Good:
```html
<livewire:profile :user="auth()->user()->uuid" /> 
```

---
### 💡 Avoid using *live* wire:model modifier where possible
Avoid using `live` wire:model modifier. This dramatically reduces unnecessary requests to the server.
In Livewire version 3, all the models are deferred by default (old: `defer` modifier), which is good.

### 💡 Avoid using *live* wire:model modifier where possible

:x: Bad:
```html
<input wire:model.live="email">
```

:heavy_check_mark: Better:
```html
<input wire:model.live.debounce.500ms="email">
```

:heavy_check_mark: Even better:
```html
<input wire:model.blur="email">
```

:heavy_check_mark: Ideal:
```html
<input wire:model="email">
```

---
### 👨‍💻 Use Artisan commands to create, move, and rename components
Livewire has [built-in Artisan commands](https://livewire.laravel.com/docs/quickstart#create-a-livewire-component) to create, move, rename components, etc.
For example, instead of manually renaming files, which could be error-prone, you can use the following command:
- `php artisan livewire:move Old/Path/To/Component New/Path/To/Component`

---
### 💱 Always use loading states for better UX
You can use [loading states](https://livewire.laravel.com/docs/loading#basic-usage) to make UX better. It will indicate to the user that something is happening in the background if your process is running longer than expected. To avoid flickering, you can use the `delay` modifier.

### 💱 Always use loading states for better UX

Example:
```html
<div>
    <button wire:click="update">Update</button>

    <span wire:loading.delay wire:target="update">
        Loading...
    </span>
</div>
```

---
### 📈 Use lazy loading
Instead of blocking the page render until your data is ready, you can create a placeholder using the [lazy loading](https://livewire.laravel.com/docs/lazy) technique to make your UI more responsive.

📈 Use lazy loading

Example:

Add the `placeholder` method in the component class:
```php
public function placeholder(): string
{
    return <<<'HTML'
        <div>
            <!-- Loading spinner... -->
            <svg>...</svg>
        </div>
    HTML;
}
```

Add the component with the `lazy` attribute:
```html
<livewire:component-name lazy />
```

---
### 🔗 Entangle
Sync your data with the backend using [$wire.entangle](https://livewire.laravel.com/docs/alpine#sharing-state-using-wireentangle) directive. This way the model will be updated instantly on the frontend, and the data will persist server-side after the network request reaches the server. It dramatically improves the user experience on slow devices. This approach is called "Optimistic Response" or "Optimistic UI" in other frontend communities.

### 🔗 Entangle your live data

```html
<div x-data="{ count: $wire.entangle('count') }">
    <input x-model="count" type="number">
    <button @click="count++">+</button>
</div>
```

---
### 🌎 Use Form Request rules for validation
Livewire doesn't support [Form Requests](https://laravel.com/docs/9.x/validation#form-request-validation) internally, but instead of hardcoding the array of validation rules in the component, you may get it directly from Form Request.
This way you can reuse the same validation rules in different application layers, for example in API endpoints.

### 🌎 Use Form Request rules for validation

:x: Bad:
```php
public function rules(): array
{
    return [
        'field1' => ['required', 'string'],
        'field2' => ['required', 'integer'],
        'field3' => ['required', 'boolean'],
    ];
}
```

:heavy_check_mark: Good:
```php
public function rules(): array
{
    return (new MyFormRequest)->rules();
}
```

---
### 🧪 Always write feature tests
Even simple tests can greatly help when you change something in the component.
Livewire has a straightforward yet powerful [testing API](https://livewire.laravel.com/docs/testing).
