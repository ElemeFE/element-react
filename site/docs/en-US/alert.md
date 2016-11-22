## Alert

Displays important alert messages.

### Basic usage

Alert components are non-overlay elements in the page that does not disappear automatically.

::: demo Alert provides 4 types of themes defined by `type`, whose default value is `info`.
```html
<Alert title="success alert" type="success" />
<Alert title="info alert" type="info" />
<Alert title="warning alert" type="warning" />
<Alert title="error alert" type="error" />
```
:::

### Customizable close button

Customize the close button as texts or other symbols.

::: demo Alert allows you to configure if it's closable. The close button text and closing callbacks are also customizable. `closable` attribute decides if the component can be closed or not. It accepts `boolean`, and the default is `true`. You can set `close-text` attribute to replace the default cross symbol as the close button. Be careful that `close-text` must be a string. `close` event fires when the component is closed.

```html
<Alert title="unclosable alert" type="success" closable={false} />
<Alert title="customized close-text" type="info" closeText="Gotcha" />
<Alert title="alert with callback" type="warning" onClose={() => alert('Hello World!')}/>
```
:::

### With icon

Displaying an icon improves readability.

::: demo Setting the `show-icon` attribute displays an icon that corresponds with the current Alert type.

```html
<Alert title="success alert" type="success" showIcon={true} />
<Alert title="info alert" type="info" showIcon={true} />
<Alert title="warning alert" type="warning" showIcon={true} />
<Alert title="error alert" type="error" showIcon={true} />
```
:::

### With description

Description includes a message with more detailed information.

::: demo Besides the required `title` attribute, you can add a `description` attribute to help you describe the alert with more details. Description can only store text string, and it will word wrap automatically.

```html
<Alert title="with description" type="success" description="This is a description." />
```
:::

### With icon and description

::: demo At last, this is an example with both icon and description.

```html
<Alert title="success alert" type="success" description="more text description" showIcon={true} />
<Alert title="info alert" type="info" description="more text description" showIcon={true} />
<Alert title="warning alert" type="warning" description="more text description" showIcon={true} />
<Alert title="error alert" type="error" description="more text description" showIcon={true} />
```
:::

### Attributes
| Attribute      | Description          | Type      | Accepted Values       | Default  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| **title** | title **REQUIRED** | string | — | — |
| type | component type | string | success/warning/info/error | info |
| description | supportive text | string | — | — |
| render-content | render function for content area, overrides `description` | function(h) | — | — |
| closable | if closable or not | boolean | — | true |
| close-text | customized close button text | string | — | — |
| show-icon | if a type icon is displayed | boolean | — | false |


### Events
| Event Name | Description | Parameters |
|---------- |-------- |---------- |
| close | fires when alert is closed | — |
