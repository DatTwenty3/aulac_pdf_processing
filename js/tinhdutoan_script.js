const csvConfigs = [
  {
    label: "Chi phí quản lý dự án",
    file: "data/chi_phi_quan_ly_du_an.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu tiền khả thi",
    file: "data/chi_phi_lap_nghien_cuu_tien_kha_thi.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu khả thi",
    file: "data/chi_phi_lap_nghien_cuu_kha_thi.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu kinh tế - kỹ thuật",
    file: "data/chi_phi_lap_bao_cao_kinhte_kythuat.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí thẩm tra nghiên cứu tiền khả thi",
    file: "data/chi_phi_tham_tra_nghien_cuu_tien_kha_thi.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí thẩm tra nghiên cứu khả thi",
    file: "data/chi_phi_tham_tra_nghien_cuu_kha_thi.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí thẩm tra thiết kế xây dựng",
    file: "data/chi_phi_tham_tra_thiet_ke_xay_dung.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí thẩm tra dự toán xây dựng",
    file: "data/chi_phi_tham_tra_du_toan_xay_dung.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu thi công xây dựng",
    file: "data/chi_phi_lap_ho_so_moi_thau_danh_gia_thau_thi_cong_xd.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu mua sắm vật tư, thiết bị",
    file: "data/chi_phi_lap_ho_so_moi_thau_danh_gia_ho_so_du_thau_mua_sam_vat_tu_thiet_bi.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí giám sát thi công xây dựng",
    file: "data/chia_phi_giam_sat_thi_cong_xay_dung.csv",
    data: [],
    thresholds: [],
  },
  {
    label: "Chi phí giám sát lắp đặt thiết bị",
    file: "data/chi_phi_giam_sat_lap_dat_thiet_bi.csv",
    data: [],
    thresholds: [],
  },
];

document.addEventListener("DOMContentLoaded", () => {
  let loadedCount = 0;

  csvConfigs.forEach((config, index) => {
    Papa.parse(config.file, {
      download: true,
      header: true,
      complete: (res) => {
        config.data = res.data.filter(
          (row) => row["Loại công trình"] && row["Loại công trình"].trim() !== ""
        );
        config.thresholds = res.meta.fields
          .filter((f) => f !== "Loại công trình")
          .map((f) => ({
            key: f,
            value: parseFloat(f.replace(/[^0-9.]/g, "")),
          }))
          .sort((a, b) => a.value - b.value);

        loadedCount++;
        if (loadedCount === csvConfigs.length) populateTypeDropdown();
      },
    });
  });

  // Lắng nghe khi người dùng nhập Gxd hoặc Gtb để tự động cập nhật G
  const gxdInput = document.getElementById("gxdValue");
  const gtbInput = document.getElementById("gtbValue");
  const gDisplay = document.getElementById("gTotalDisplay");

  function updateGDisplay() {
    const gxd = parseFloat(gxdInput.value) || 0;
    const gtb = parseFloat(gtbInput.value) || 0;
    const g = gxd + gtb;
    gDisplay.textContent = g.toFixed(3);
  }

  gxdInput.addEventListener("input", updateGDisplay);
  gtbInput.addEventListener("input", updateGDisplay);

  document.getElementById("calcBtn").addEventListener("click", () => {
    const G = parseFloat(gxdInput.value || 0) + parseFloat(gtbInput.value || 0);
    const type = document.getElementById("typeSelect").value;
    if (isNaN(G) || G <= 0 || !type) {
      alert("Vui lòng nhập đầy đủ Gxd, Gtb và chọn loại công trình.");
      return;
    }

    const results = csvConfigs.map((config) => {
      const row = config.data.find((r) => r["Loại công trình"] === type);
      const val = interpolate(row, config.thresholds, G);
      return {
        label: config.label,
        value: val,
      };
    });

    populateCostTypeSelect(results);
    document.getElementById("resultSection").style.display = "block";
  });

  document.getElementById("costTypeSelect").addEventListener("change", () => {
    const selectedLabel = document.getElementById("costTypeSelect").value;
    const result = latestResults.find((r) => r.label === selectedLabel);
    displaySingleResult(result);
  });
});

let latestResults = [];

function populateTypeDropdown() {
  const sel = document.getElementById("typeSelect");
  const uniqueTypes = new Set(
    csvConfigs[0].data
      .map((r) => r["Loại công trình"])
      .filter((v) => v && v.trim() !== "")
  );
  uniqueTypes.forEach((type) => {
    const opt = document.createElement("option");
    opt.value = type;
    opt.textContent = type;
    sel.appendChild(opt);
  });
}

function parseValue(str) {
  return parseFloat(str.replace(/,/g, "."));
}

function interpolate(row, thresholds, G) {
  if (!row) return null;
  if (G <= thresholds[0].value) return parseValue(row[thresholds[0].key]);
  if (G >= thresholds[thresholds.length - 1].value)
    return parseValue(row[thresholds[thresholds.length - 1].key]);

  for (let i = 0; i < thresholds.length - 1; i++) {
    const lo = thresholds[i], hi = thresholds[i + 1];
    if (G >= lo.value && G <= hi.value) {
      const v1 = parseValue(row[lo.key]);
      const v2 = parseValue(row[hi.key]);
      return v1 + (v2 - v1) * (G - lo.value) / (hi.value - lo.value);
    }
  }
  return null;
}

function populateCostTypeSelect(results) {
  latestResults = results;
  const select = document.getElementById("costTypeSelect");
  select.innerHTML = '<option value="" disabled selected>-- Chọn loại chi phí --</option>';
  results.forEach((res) => {
    const opt = document.createElement("option");
    opt.value = res.label;
    opt.textContent = res.label;
    select.appendChild(opt);
  });
  document.getElementById("singleResult").innerHTML = "";
}

function displaySingleResult(res) {
  const container = document.getElementById("singleResult");
  container.innerHTML = `
    <h2>${res.label}</h2>
    <p>Định mức: <span class="highlight">${res.value !== null ? res.value.toFixed(3) + " %" : "Không xác định"}</span></p>
  `;
}
