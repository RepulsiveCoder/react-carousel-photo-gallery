# react-carousel-photo-gallery

A lightweight, customizable React carousel component specifically designed for photo galleries, featuring thumbnail support, fullscreen mode, and flexible navigation overrides

---

## Installation

```bash
npm install react-carousel-photo-gallery
```

or

```bash
yarn add react-carousel-photo-gallery
```

---

## Quick Start

```jsx
import { CarouselPhotoGallery } from 'react-carousel-photo-gallery';


const App = () => {
  const images = [
    <img src="img1.jpg" alt="1" />,
    <img src="img2.jpg" alt="2" />,
    <img src="img3.jpg" alt="3" />,
  ];

  const thumbnails = [
    <img src="thumb1.jpg" alt="t1" />,
    <img src="thumb2.jpg" alt="t2" />,
    <img src="thumb3.jpg" alt="t3" />,
  ];

  return (
    <CarouselPhotoGallery
      displayThumbs={true}
      thumbs={thumbnails}
      slideDelay={3000}
    >
      {images}
    </CarouselPhotoGallery>
  );
};
```

## Using Captions & Titles

You can wrap your images in a container to display titles or overlays. Here is how to implement the imageWithCaptionContainer structure within the carousel:

```jsx
import { CarouselPhotoGallery } from 'react-carousel-photo-gallery';

const App = () => {
  const slides = [
    <div className="imageWithCaptionContainer" key="1">
      <img src="img1.jpg" alt="Mountain View" />
      <div className="info">Sunset in the Mountains</div>
    </div>,
    <div className="imageWithCaptionContainer" key="2">
      <img src="img2.jpg" alt="Ocean Breeze" />
      <div className="info">Summer Beach Days</div>
    </div>
  ];

  return (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <CarouselPhotoGallery
        displayThumbs={false}
        width="100%"
      >
        {slides}
      </CarouselPhotoGallery>
    </div>
  );
};

export default App;
```

---


---

## Props

| Prop              | Type                                     | Default     | Description                                                                |
| ----------------- | ---------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `title`           | `React.ReactNode`                        | —           | Content displayed inside the tooltip.                                      |
| `children`        | `React.ReactElement`                     | —           | The element that triggers the tooltip. Must be a single React element.     |
| `container`       | `HTMLDivElement \| null`                 | `undefined` | Optional container element for rendering the tooltip (useful for portals). |
| `placement`       | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`     | Position of the tooltip relative to the trigger element.                   |
| `arrow`           | `boolean`                                | `false`     | Displays an arrow pointing to the trigger element.                         |
| `delayDuration`   | `number`                                 | `0`         | Delay in milliseconds before showing the tooltip.                          |
| `enterTouchDelay` | `number`                                 | `0`         | Delay in milliseconds before showing the tooltip on touch devices.         |
| `leaveTouchDelay` | `number`                                 | `1500`      | Delay in milliseconds before hiding the tooltip on touch devices.          |
| `style`           | `React.CSSProperties`                    | `undefined` | Inline styles applied to the tooltip container.                            |
| `slotProps`       | `{ tooltip?, content?, arrow? }`         | `undefined` | Advanced customization for tooltip internal slots.                         |

---

## `slotProps` Structure

| Key       | Type                      | Description                                          |
| --------- | ------------------------- | ---------------------------------------------------- |
| `tooltip` | `Record<string, unknown>` | Custom props applied to the tooltip wrapper element. |
| `content` | `Record<string, unknown>` | Custom props applied to the tooltip content element. |
| `arrow`   | `Record<string, unknown>` | Custom props applied to the arrow element.           |


---

## Styling (CSS Variables)

This component supports theming via standard CSS custom properties.
You can override these variables globally or within a scoped container.

---

### Available CSS Variables

| Variable                           | Fallback    | Description                             |
| ---------------------------------- | ----------- | --------------------------------------- |
| `--border-color`                   | `#EDEDED99` | Border color used across the component. |
| `--accent-color`                   | `#36C2`     | Primary accent color.                   |
| `--accent-secondary-color`         | `#36C2`     | Secondary accent color.                 |
| `--background-color`               | `#36C2`     | Default background color.               |
| `--background-color-maximized`     | `#000`      | Background color when maximized.        |
| `--button-background-color`        | `#36C2`     | Default button background color.        |
| `--button-active-background-color` | `#36C2`     | Active button background color.         |
| `--navigation-background-color`    | `#fff`      | Navigation area background color.       |

---

## 🛠️ How to Override

### Global Theme

```css
:root {
  --accent-color: #6366f1;
  --background-color: #0f172a;
  --border-color: #334155;
}
```

---

### Scoped Theme

```css
.my-custom-theme {
  --accent-color: #22c55e;
  --background-color: #111827;
}
```

```tsx
<div className="my-custom-theme">
  <YourComponent />
</div>
```

---

## 🌗 Dark Mode Example

```css
body.dark {
  --background-color: #000;
  --navigation-background-color: #111;
  --border-color: #222;
}
```
---

## Compatibility

* ✅ React 18+
* ✅ Next.js (App & Pages Router)
* ✅ Vite / CRA

---

## License

MIT © Abdullah Ibne Alam

---

## Contributing

Pull requests are welcome! <br />
If you have ideas for enhancements or performance improvements, feel free to open an issue.<br />
[https://github.com/RepulsiveCoder/react-carousel-photo-gallery](https://github.com/RepulsiveCoder/react-carousel-photo-gallery)

---

## If you like it…

Drop a ⭐ on the repo and use it to make your UI feel alive!
