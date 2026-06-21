const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/menu/Lista Productos Registrados (1).xlsx');
const outPath = path.join(__dirname, 'src/data/menu/filtered_items.json');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const filtered = rows.filter(row => {
        let price = parseFloat(row['PrecioUnidad']);
        if (isNaN(price) || price <= 1000) return false;
        return true;
    }).map(row => ({
        nombre: row['Nombre'],
        precio: parseFloat(row['PrecioUnidad']),
        categoria_raw: row['Lista Inventario'],
        lo_compro: row['Lo Compro']
    }));

    fs.writeFileSync(outPath, JSON.stringify(filtered, null, 2));
    console.log(`Filtered down to ${filtered.length} items. Written to ${outPath}`);

} catch (err) {
    console.error(err);
}
