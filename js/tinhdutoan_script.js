const csvConfigs = [
  {
    label: "Chi phí quản lý dự án",
    file: "data/chi_phi_quan_ly_du_an.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `- Chi phí quản lý dự án xác định theo định mức ban hành tại bảng 1.1 kèm theo Thông tư này chưa bao gồm chi phí dự phòng.
                - Chi phí quản lý dự án xác định theo định mức ban hành tại bảng 1.1 kèm theo Thông tư này chưa bao gồm chi phí để chủ đầu tư trực tiếp thực hiện công việc thẩm định (không thuê đơn vị tư vấn thẩm tra) thiết kế xây dựng triển khai sau thiết kế cơ sở và thẩm định dự toán xây dựng. Chi phí để chủ đầu tư trực tiếp thẩm định các công việc trên xác định bằng 80% chi phí thẩm tra thiết kế, dự toán xây dựng theo hướng dẫn tại Thông tư này và bổ sung thêm vào nguồn chi phí quản lý dự án.
                - Chi phí quản lý dự án của dự án đầu tư xây dựng công trình hàng không xác định theo định mức chi phí của loại công trình dân dụng.`
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu tiền khả thi",
    file: "data/chi_phi_lap_nghien_cuu_tien_kha_thi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: "",
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu khả thi",
    file: "data/chi_phi_lap_nghien_cuu_kha_thi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: "",
  },
  {
    label: "Chi phí lập báo cáo nghiên cứu kinh tế - kỹ thuật",
    file: "data/chi_phi_lap_bao_cao_kinhte_kythuat.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: "Chi phí lập báo cáo kinh tế - kỹ thuật xác định theo định mức ban hành tại bảng 2.3 kèm theo Thông tư này (chưa bao gồm thuế GTGT) tối thiểu không nhỏ hơn 5.000.000 đồng.",
  },
  {
    label: "Chi phí thẩm tra nghiên cứu tiền khả thi",
    file: "data/chi_phi_tham_tra_nghien_cuu_tien_kha_thi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `Chi phí thẩm tra báo cáo nghiên cứu tiền khả thi xác định theo định mức ban hành tại bảng 2.14 kèm theo Thông tư này phân chia như sau:
                - Thẩm tra thiết kế sơ bộ: 35%;
                - Thẩm tra sơ bộ tổng mức đầu tư: 35%;
                - Thẩm tra các nội dung còn lại của dự án: 30%.`
  },
  {
    label: "Chi phí thẩm tra báo cáo nghiên cứu khả thi",
    file: "data/chi_phi_tham_tra_nghien_cuu_kha_thi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `- Chi phí thẩm tra báo cáo nghiên cứu khả thi xác định theo định mức ban hành tại bảng 2.15 kèm theo Thông tư này phân chia như sau:
                + Thẩm tra thiết kế cơ sở: 35%;
                + Thẩm tra tổng mức đầu tư: 35%;
                + Thẩm tra các nội dung còn lại của dự án: 30%.
                - Trường hợp dự án có yêu cầu phải thẩm tra thiết kế công nghệ của dự án thì chi phí thẩm tra thiết kế công nghệ bổ sung bằng 20% của chi phí thẩm tra báo cáo nghiên cứu khả thi.`
  },
  {
    label: "Chi phí thẩm tra thiết kế xây dựng",
    file: "data/chi_phi_tham_tra_thiet_ke_xay_dung.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `- Chi phí thẩm tra thiết kế của công trình có sử dụng thiết kế điển hình, thiết kế mẫu do cơ quan có thẩm quyền ban hành điều chỉnh với hệ số k = 0,36 đối với công trình thứ hai trở đi.
                - Đối với công trình có yêu cầu thiết kế 3 bước nếu có yêu cầu thẩm tra cả thiết kế kỹ thuật và thiết kế bản vẽ thi công thì chi phí thẩm tra thiết kế kỹ thuật xác định theo định mức ban hành tại bảng 2.16 kèm theo Thông tư này, chi phí thẩm tra thiết kế bản vẽ thi công xác định bằng 40% chi phí thẩm tra thiết kế kỹ thuật.
                - Chi phí thẩm tra thiết kế công trình san nền tính bằng 40% chi phí thẩm tra thiết kế công trình giao thông.
                - Chi phí thẩm tra thiết kế xác định theo định mức (chưa bao gồm thuế GTGT) tối thiểu không nhỏ hơn 2.000.000 đồng.`
  },
  {
    label: "Chi phí thẩm tra dự toán xây dựng",
    file: "data/chi_phi_tham_tra_du_toan_xay_dung.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `- Đối với công trình có yêu cầu thiết kế 3 bước nếu có yêu cầu thẩm tra cả dự toán thiết kế kỹ thuật và thẩm tra dự toán thiết kế bản vẽ thi công thì chi phí thẩm tra xác định riêng cho từng dự toán theo định mức ban hành tại bảng 2.17 kèm theo Thông tư này.
                - Chi phí thẩm tra dự toán dự toán xây dựng công trình đối với công trình có sử dụng thiết kế điển hình, thiết kế mẫu do cơ quan có thẩm quyền ban hành điều chỉnh với hệ số k = 0,36 đối với công trình thứ hai trở đi.
                - Chi phí thẩm tra dự toán công trình san nền tính bằng 40% định mức chi phí thẩm tra dự toán công trình giao thông.
                - Chi phí thẩm tra dự toán xác định theo định mức tỷ lệ phần trăm (chưa bao gồm thuế GTGT) tối thiểu không nhỏ hơn 2.000.000 đồng.`
  },
  {
    label: "Chi phí lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu thi công xây dựng",
    file: "data/chi_phi_lap_ho_so_moi_thau_danh_gia_thau_thi_cong_xd.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `Chi phí lập hồ sơ mời thầu và đánh giá hồ sơ dự thầu thi công xây dựng tính theo định mức ban hành tại bảng 2.19 kèm theo Thông tư này phân chia như sau:
                - Lập hồ sơ mời thầu: 45%;
                - Đánh giá hồ sơ dự thầu: 55%.`
  },
  {
    label: "Chi phí lập hồ sơ mời thầu, đánh giá hồ sơ dự thầu mua sắm vật tư, thiết bị",
    file: "data/chi_phi_lap_ho_so_moi_thau_danh_gia_ho_so_du_thau_mua_sam_vat_tu_thiet_bi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: `Chi phí lập hồ sơ mời thầu và đánh giá hồ sơ dự thầu thi công xây dựng tính theo định mức ban hành tại bảng 2.20 kèm theo Thông tư này phân chia như sau:
                - Lập hồ sơ mời thầu: 45%;
                - Đánh giá hồ sơ dự thầu: 55%.`
  },
  {
    label: "Chi phí giám sát thi công xây dựng",
    file: "data/chia_phi_giam_sat_thi_cong_xay_dung.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: "",
  },
  {
    label: "Chi phí giám sát lắp đặt thiết bị",
    file: "data/chi_phi_giam_sat_lap_dat_thiet_bi.csv",
    data: [],
    thresholds: [],
    noteAbove: "*Theo thông tư 12/2021/TT-BXD",
    noteBelow: "",
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
        noteAbove: config.noteAbove,
        noteBelow: config.noteBelow,
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
    ${res.noteAbove ? `<p class="note note-above">${res.noteAbove}</p>` : ""}
    <h2>${res.label}</h2>
    <p>Định mức: <span class="highlight">${res.value !== null ? res.value.toFixed(3) + " %" : "Không xác định"}</span></p>
    ${res.noteBelow ? `<p class="note note-below">${res.noteBelow.replace(/\n/g, "<br>")}</p>` : ""}
  `;
}