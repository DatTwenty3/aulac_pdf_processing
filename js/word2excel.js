function convertToExcel() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Vui lòng chọn một file Word (.docx)');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const arrayBuffer = event.target.result;

        // Sử dụng mammoth.js để trích xuất HTML từ file Word
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
            .then(function(result) {
                const html = result.value;

                // Parse HTML để lấy bảng và định dạng
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const tables = doc.querySelectorAll('table');

                if (tables.length === 0) {
                    alert('Không tìm thấy bảng trong file Word.');
                    return;
                }

                // Tạo workbook Excel mới
                const wb = XLSX.utils.book_new();

                tables.forEach((table, index) => {
                    const rows = [];
                    const styles = []; // Lưu định dạng cho từng ô
                    const trs = table.querySelectorAll('tr');

                    trs.forEach((tr, rowIndex) => {
                        const cells = [];
                        const cellStyles = [];
                        const tds = tr.querySelectorAll('td, th');

                        tds.forEach((td, colIndex) => {
                            const text = td.textContent.trim();
                            cells.push(text);

                            // Lấy định dạng từ style inline
                            const style = td.style;
                            const computedStyle = window.getComputedStyle(td);
                            const cellStyle = {
                                fontSize: style.fontSize || computedStyle.fontSize,
                                color: style.color || computedStyle.color,
                                backgroundColor: style.backgroundColor || computedStyle.backgroundColor,
                                bold: computedStyle.fontWeight === 'bold' || parseInt(computedStyle.fontWeight) >= 700
                            };
                            cellStyles.push(cellStyle);
                        });

                        rows.push(cells);
                        styles.push(cellStyles);
                    });

                    // Tạo worksheet từ dữ liệu bảng
                    const ws = XLSX.utils.aoa_to_sheet(rows);

                    // Áp dụng định dạng cho worksheet
                    for (let row = 0; row < rows.length; row++) {
                        for (let col = 0; col < rows[row].length; col++) {
                            const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
                            if (!ws[cellRef]) ws[cellRef] = {};
                            ws[cellRef].s = {
                                font: {
                                    sz: parseFloat(styles[row][col].fontSize) || 11, // Kích thước font
                                    bold: styles[row][col].bold,
                                    color: { rgb: parseColor(styles[row][col].color) }
                                },
                                fill: {
                                    fgColor: { rgb: parseColor(styles[row][col].backgroundColor) }
                                }
                            };
                        }
                    }

                    // Đặt chiều rộng cột tự động (tuỳ chọn)
                    ws['!cols'] = autoFitColumns(rows);

                    // Thêm worksheet vào workbook
                    XLSX.utils.book_append_sheet(wb, ws, `Sheet${index + 1}`);
                });

                // Tạo và tải file Excel
                XLSX.writeFile(wb, 'output.xlsx');
            })
            .catch(function(err) {
                console.error(err);
                alert('Có lỗi xảy ra khi đọc file Word. Vui lòng kiểm tra file và thử lại.');
            });
    };

    reader.readAsArrayBuffer(file);
}

// Hàm chuyển đổi màu sắc từ CSS sang định dạng RGB HEX cho Excel
function parseColor(color) {
    if (!color || color === 'transparent') return 'FFFFFF'; // Mặc định trắng
    if (color.startsWith('#')) return color.replace('#', '');
    if (color.startsWith('rgb')) {
        const matches = color.match(/\d+/g);
        if (matches) {
            return matches.map(n => parseInt(n).toString(16).padStart(2, '0')).join('').toUpperCase();
        }
    }
    return '000000'; // Mặc định đen
}

// Hàm tự động điều chỉnh chiều rộng cột
function autoFitColumns(rows) {
    const colWidths = [];
    rows.forEach(row => {
        row.forEach((cell, colIndex) => {
            const len = cell ? cell.toString().length : 10;
            colWidths[colIndex] = Math.max(colWidths[colIndex] || 0, len);
        });
    });
    return colWidths.map(w => ({ wch: w + 2 }));
}