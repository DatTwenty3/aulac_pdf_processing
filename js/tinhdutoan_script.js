let data1 = [], data2 = [];
let thresholds1 = [], thresholds2 = [];

// Khi DOM đã sẵn sàng, tải 2 file CSV (đặt chung thư mục với index.html)
document.addEventListener('DOMContentLoaded', () => {
  // Bảng 1.1: bang_chi_phi.csv
  Papa.parse('data/chi_phi_quan_ly_du_an.csv', {
    download: true,
    header: true,
    complete: (res) => {
      data1 = res.data;
      thresholds1 = res.meta.fields
        .filter(f => f !== 'Loại công trình')
        .map(f => ({
          key: f,
          value: parseFloat(f.replace(/[^0-9.]/g, ''))
        }))
        .sort((a, b) => a.value - b.value);
      checkReady();
    }
  });
  // Bảng 2.1: bang_chi_phi_bao_cao.csv
  Papa.parse('data/chi_phi_lap_nghien_cuu_kha_thi.csv', {
    download: true,
    header: true,
    complete: (res) => {
      data2 = res.data;
      thresholds2 = res.meta.fields
        .filter(f => f !== 'Loại công trình')
        .map(f => ({
          key: f,
          value: parseFloat(f.replace(/[^0-9.]/g, ''))
        }))
        .sort((a, b) => a.value - b.value);
      checkReady();
    }
  });
});

// Khi cả 2 data đã load xong, populate dropdown
function checkReady() {
  if (data1.length && data2.length) {
    const sel = document.getElementById('typeSelect');
    data1.forEach(row => {
      const opt = document.createElement('option');
      opt.value = row['Loại công trình'];
      opt.textContent = row['Loại công trình'];
      sel.appendChild(opt);
    });
  }
}

// Hàm parse giá trị "3,446" → 3.446
function parseValue(str) {
  return parseFloat(str.replace(/,/g, '.'));
}

// Nội suy theo 2 điểm gần nhất
function interpolate(row, thresholds, G) {
  if (!row) return null;
  const t = thresholds;
  // Nếu G dưới ngưỡng thấp nhất → lấy giá trị ở ngưỡng thấp nhất
  if (G <= t[0].value) {
    return parseValue(row[t[0].key]);
  }
  // Nếu G vượt ngưỡng cao nhất → lấy giá trị ngưỡng cao nhất
  if (G >= t[t.length - 1].value) {
    return parseValue(row[t[t.length - 1].key]);
  }
  // Tìm đoạn chứa G
  for (let i = 0; i < t.length - 1; i++) {
    const lo = t[i], hi = t[i + 1];
    if (G >= lo.value && G <= hi.value) {
      // đúng điểm
      if (G === lo.value) return parseValue(row[lo.key]);
      if (G === hi.value) return parseValue(row[hi.key]);
      // nội suy
      const v1 = parseValue(row[lo.key]);
      const v2 = parseValue(row[hi.key]);
      return v1 + (v2 - v1) * (G - lo.value) / (hi.value - lo.value);
    }
  }
  return null;
}

// Khi nhấn nút "Tính toán"
document.getElementById('calcBtn').addEventListener('click', () => {
  const G = parseFloat(document.getElementById('gValue').value);
  const type = document.getElementById('typeSelect').value;
  if (isNaN(G) || !type) {
    alert('Vui lòng nhập giá trị G và chọn loại công trình.');
    return;
  }
  const row1 = data1.find(r => r['Loại công trình'] === type);
  const row2 = data2.find(r => r['Loại công trình'] === type);
  const res1 = interpolate(row1, thresholds1, G);
  const res2 = interpolate(row2, thresholds2, G);
  displayResults(res1, res2);
});

// Hiển thị kết quả
function displayResults(val1, val2) {
  const c = document.getElementById('results');
  c.innerHTML = `
    <h2>Chi phí quản lý dự án</h2>
    <p>Định mức: <span class="highlight">${val1 !== null ? val1.toFixed(3) + ' %' : 'Không xác định'}</span></p>
    <h2>Chi phí lập báo cáo nghiên cứu tiền khả thi</h2>
    <p>Định mức: <span class="highlight">${val2 !== null ? val2.toFixed(3) + ' %' : 'Không xác định'}</span></p>
  `;
}
