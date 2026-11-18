(function () {
  var filterWrap = document.getElementById("filters");
  var items = [];
  var activeBrand = "all";

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function allGrids() {
    return document.querySelectorAll("#inventory-grid, [data-brand-section]");
  }

  function showEmpty(grid, message) {
    grid.innerHTML = '<p class="empty">' + (message || "New inventory coming soon") + "</p>";
  }

  function cardHtml(item) {
    var name = escapeHtml(item.name || "");
    var category = escapeHtml(item.category || "");
    var description = escapeHtml(item.description || "");
    var status = escapeHtml(item.status || "");
    var price = item.price ? '<p class="price">' + escapeHtml(item.price) + "</p>" : "";
    var reference = item.reference ? escapeHtml(item.reference) : "";
    var brand = escapeHtml(item.brand || "");
    var alt = name || "Luxury watch";
    var media;
    if (item.image) {
      media = '<div class="media"><img src="' + escapeHtml(item.image) + '" alt="' + alt + '"></div>';
    } else {
      media = '<div class="media"><div class="img-fallback" role="img" aria-label="' + alt + '"></div></div>';
    }
    var metaParts = [];
    if (brand) metaParts.push(brand);
    if (category) metaParts.push(category);
    if (reference) metaParts.push("Ref. " + reference);
    var meta = metaParts.length ? '<p class="meta">' + metaParts.join(" · ") + "</p>" : "";
    return (
      '<article class="card">' +
        media +
        "<h3>" + name + "</h3>" +
        meta +
        (description ? '<p class="desc">' + description + "</p>" : "") +
        price +
        (status ? '<p class="status">' + status + "</p>" : "") +
      "</article>"
    );
  }

  function itemsForGrid(grid) {
    var list = items.slice();
    var sectionBrand = grid.getAttribute("data-brand-section");
    if (sectionBrand) {
      list = list.filter(function (item) {
        return (item.brand || "") === sectionBrand;
      });
    } else if (activeBrand !== "all") {
      list = list.filter(function (item) {
        return (item.brand || "") === activeBrand;
      });
    }
    var featured = grid.getAttribute("data-featured");
    var limitAttr = grid.getAttribute("data-limit");
    var limit = featured ? parseInt(featured, 10) : limitAttr ? parseInt(limitAttr, 10) : NaN;
    if (!isNaN(limit) && limit > 0) list = list.slice(0, limit);
    return list;
  }

  function renderGrid(grid) {
    var list = itemsForGrid(grid);
    var sectionBrand = grid.getAttribute("data-brand-section");
    if (!list.length) {
      var message = "New inventory coming soon";
      if (!sectionBrand && activeBrand !== "all") message = "No watches in this filter.";
      showEmpty(grid, message);
      return;
    }
    grid.innerHTML = list.map(cardHtml).join("");
  }

  function render() {
    allGrids().forEach(renderGrid);
  }

  function renderFilters() {
    if (!filterWrap) return;
    var brands = [];
    items.forEach(function (item) {
      if (item.brand && brands.indexOf(item.brand) === -1) brands.push(item.brand);
    });
    brands.sort();
    var html = '<button type="button" class="filter-btn" data-brand="all" aria-pressed="true">All</button>';
    brands.forEach(function (brand) {
      html += '<button type="button" class="filter-btn" data-brand="' + escapeHtml(brand) + '" aria-pressed="false">' + escapeHtml(brand) + "</button>";
    });
    filterWrap.innerHTML = html;
    filterWrap.addEventListener("click", function (event) {
      var btn = event.target.closest(".filter-btn");
      if (!btn) return;
      activeBrand = btn.getAttribute("data-brand") || "all";
      filterWrap.querySelectorAll(".filter-btn").forEach(function (el) {
        el.setAttribute("aria-pressed", el === btn ? "true" : "false");
      });
      var main = document.getElementById("inventory-grid");
      if (main) renderGrid(main);
    });
  }

  if (!allGrids().length) return;

  fetch("inventory.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Could not load inventory");
      return res.json();
    })
    .then(function (data) {
      items = Array.isArray(data) ? data : [];
      if (!items.length) {
        allGrids().forEach(function (grid) { showEmpty(grid); });
        return;
      }
      renderFilters();
      render();
    })
    .catch(function () {
      allGrids().forEach(function (grid) { showEmpty(grid); });
    });
})();
