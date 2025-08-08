# Replace Testimonial Images

To update the testimonials with the actual professional headshots you provided, please replace the following files:

## Image Files to Replace:

1. **`public/_static/avatars/testimonial-1.png`** - Replace with the middle-aged man with glasses (Michael Chen)
2. **`public/_static/avatars/testimonial-2.png`** - Replace with the young Black woman with braids (Aisha Johnson)
3. **`public/_static/avatars/testimonial-3.png`** - Replace with the young man with beard (James Rodriguez)
4. **`public/_static/avatars/testimonial-4.png`** - Replace with the young woman with dark hair (Sarah Williams)
5. **`public/_static/avatars/testimonial-5.png`** - Replace with the middle-aged woman with curly hair (Marcus Davis)
6. **`public/_static/avatars/testimonial-6.png`** - Replace with the young man with glasses (Priya Patel)
7. **`public/_static/avatars/testimonial-7.png`** - Replace with the young Black man (David Kim)

## Steps:

1. **Save your images** with the exact filenames above
2. **Replace the files** in the `public/_static/avatars/` directory
3. **Restart the development server** if it's running
4. **Clear browser cache** to see the new images

## Current Configuration:

The testimonials are already configured with the correct names and image paths:

```typescript
export const testimonials: TestimonialType[] = [
  {
    name: "Michael Chen",
    job: "Head of Customer Success",
    image: "/_static/avatars/testimonial-1.png",
    // ...
  },
  {
    name: "Aisha Johnson", 
    job: "Product Manager",
    image: "/_static/avatars/testimonial-2.png",
    // ...
  },
  // ... etc
];
```

## Image Requirements:

- **Format**: PNG or JPEG
- **Size**: Recommended 200x200px or larger (will be automatically resized)
- **Quality**: High quality professional headshots
- **Background**: Clean, professional backgrounds preferred

Once you replace the image files, the testimonials will display the actual professional headshots with the appropriate names! 