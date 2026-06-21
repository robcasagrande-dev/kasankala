const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'src/data/menu/filtered_items.json');
const outputPath = path.join(__dirname, 'src/data/menu_optimizado.json');

const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

const categoriesMap = {
    "Entradas": [],
    "Ensaladas": [],
    "Pastas y Arroces": [],
    "Platos Fuertes": [],
    "Del Mar": [],
    "Postres": [],
    "Bebidas y Cócteles": [],
    "Licores": []
};

// Helper per rimuovere numeri iniziali es: "10 PATACONES" -> "PATACONES"
function cleanName(name) {
    let cleaned = name.replace(/^\d+\s+/, '').trim();
    // Capitalize first letter of each word
    return cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// Generatore di descrizioni fittizie ma eleganti
function generateDescription(name, category) {
    name = name.toLowerCase();
    if(category === "Postres") return "Un toque dulce perfecto para terminar la velada.";
    if(category === "Bebidas y Cócteles") return "Refrescante y preparado al momento con los mejores ingredientes.";
    if(name.includes('ceviche')) return "Fresco y vibrante, marinado a la perfección con cítricos y especias locales.";
    if(name.includes('ensalada')) return "Mezcla de hojas frescas, vegetales crujientes y un aderezo de la casa.";
    if(name.includes('pasta') || name.includes('arroz') || name.includes('risotto')) return "Receta tradicional con un toque de innovación, cocinada en su punto exacto.";
    if(name.includes('pescado') || name.includes('mariscos') || name.includes('pulpo') || name.includes('langosta') || name.includes('robalo')) return "Captura fresca del día, resaltando los sabores auténticos del mar Caribe.";
    if(name.includes('lomo') || name.includes('pollo') || name.includes('costillas') || name.includes('chuleta')) return "Corte seleccionado, preparado a fuego lento para garantizar la máxima jugosidad.";
    return "Una especialidad de la casa que combina texturas y sabores únicos.";
}

rawData.forEach(item => {
    let name = cleanName(item.nombre);
    let nameLower = name.toLowerCase();
    let price = item.precio;
    let inv = item.categoria_raw ? item.categoria_raw.toLowerCase() : '';

    let cat = "Platos Fuertes";

    if (inv.includes('bar') || inv.includes('bedidas') || inv.includes('bebidas') || nameLower.includes('cerveza') || nameLower.includes('vino') || nameLower.includes('coctel') || nameLower.includes('cocktail') || nameLower.includes('agua') || nameLower.includes('jugo') || nameLower.includes('cafe')) {
        if(nameLower.includes('botella') || nameLower.includes('chupito')) {
            cat = "Licores";
        } else {
            cat = "Bebidas y Cócteles";
        }
    } else if (nameLower.includes('postre') || nameLower.includes('tarta') || nameLower.includes('cheesecake') || nameLower.includes('helado') || nameLower.includes('volcan') || nameLower.includes('pie')) {
        cat = "Postres";
    } else if (nameLower.includes('ensalada')) {
        cat = "Ensaladas";
    } else if (nameLower.includes('pasta') || nameLower.includes('arroz') || nameLower.includes('risotto')) {
        cat = "Pastas y Arroces";
    } else if (nameLower.includes('ceviche') || nameLower.includes('patacones') || nameLower.includes('empanadas') || nameLower.includes('carpaccio') || nameLower.includes('bruschetta') || nameLower.includes('hummus') || nameLower.includes('crema') || nameLower.includes('picada')) {
        cat = "Entradas";
    } else if (nameLower.includes('pescado') || nameLower.includes('robalo') || nameLower.includes('pulpo') || nameLower.includes('langosta') || nameLower.includes('mariscos')) {
        cat = "Del Mar";
    } else if (nameLower.includes('lomo') || nameLower.includes('pollo') || nameLower.includes('costillas') || nameLower.includes('chuleta') || nameLower.includes('hamburguesa')) {
        cat = "Platos Fuertes";
    }

    categoriesMap[cat].push({
        nombre: name,
        precio: price,
        descripcion: generateDescription(name, cat)
    });
});

// Costruisci l'array finale per Astro
const finalMenu = [];
for (const [catName, items] of Object.entries(categoriesMap)) {
    if (items.length > 0) {
        // Sort items by price descending optionally, or alphabetically
        items.sort((a,b) => a.nombre.localeCompare(b.nombre));
        finalMenu.push({
            categoria: catName,
            items: items
        });
    }
}

fs.writeFileSync(outputPath, JSON.stringify(finalMenu, null, 2));
console.log(`Menù ottimizzato generato in ${outputPath}`);
