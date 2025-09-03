// Dimensions communes des images par type
export const getImageDimensions = (imagePath: string) => {
  // Images MICIM (affiches)
  if (imagePath.includes('affiche-comedie-musicale') && imagePath.includes('h600')) {
    return { width: 432, height: 600 };
  }
  
  // Images MICIM (visuels larges)
  if (imagePath.includes('visuel-comedie-musicale-blanc')) {
    return { width: 2861, height: 1711 };
  }
  
  if (imagePath.includes('visuel-comedie-musicale-noir')) {
    return { width: 1000, height: 674 };
  }
  
  // Images Tipaix (spectacles)
  if (imagePath.includes('tipaix/spectacle-1')) {
    return { width: 2048, height: 1536 };
  }
  
  if (imagePath.includes('tipaix/spectacle-2') || imagePath.includes('tipaix/spectacle-3')) {
    return { width: 1600, height: 1200 };
  }
  
  // Dimensions par défaut (4:3)
  return { width: 1200, height: 900 };
};

export const isPortraitImage = (imagePath: string) => {
  const dims = getImageDimensions(imagePath);
  return dims.height > dims.width;
};