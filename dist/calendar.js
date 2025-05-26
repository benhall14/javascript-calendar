function Calendar(element, options) {

    function daysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    function findEvents(events, day) {
        if (!events) return false;
        const time = day.getTime();
        const found = events.filter(ev => time >= ev.start.getTime() && time <= ev.end.getTime());
        return found.length ? found : false;
    }

    var $defaults = {
        class_prefix: 'javascript-calendar',
        events: false
    };

    $defaults.months = Array.from({ length: 12 }, (_, i) =>
        new Date(2000, i, 1).toLocaleString(undefined, { month: 'long' })
    );

    $defaults.days = Array.from({ length: 7 }, (_, i) =>
        new Date(2000, 0, i + 2).toLocaleString(undefined, { weekday: 'short' }).toUpperCase()
    );

    options = options || {};
    var $opt = Object.assign({}, $defaults, options);

    if ($opt.events) {
        $opt.events = $opt.events.map(function (value) {
            value.start = new Date(value.start);
            value.start.setHours(0, 0, 0, 0);
            value.end = new Date(value.end);
            value.end.setHours(0, 0, 0, 0);
            return value;
        });
    }

    let date = new Date();
    if ($opt.date) {
        date = new Date($opt.date);
    }

    date.setDate(1);
    date.setHours(0, 0, 0, 0);

    var running_day = new Date(date);
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var total_days_in_month = daysInMonth(date.getFullYear(), date.getMonth());

    var thead = document.createElement('thead');
    var titleRow = document.createElement('tr');
    titleRow.className = $opt.class_prefix + '-title';
    var titleTh = document.createElement('th');
    titleTh.colSpan = 7;
    titleTh.textContent = $opt.months[date.getMonth()] + ' ' + date.getFullYear();
    titleRow.appendChild(titleTh);
    thead.className = $opt.class_prefix + '-head';
    thead.appendChild(titleRow);

    var headerRow = document.createElement('tr');
    headerRow.className = $opt.class_prefix + '-header';
    for (var i = 0; i < 7; i++) {
        headerRow.appendChild(Object.assign(document.createElement('th'), {
            className: $opt.class_prefix + '-day',
            textContent: $opt.days[i]
        }));
    }
    thead.appendChild(headerRow);

    var tbody = document.createElement('tbody');
    tbody.className = $opt.class_prefix + '-body';
    var tr = document.createElement('tr');
    tr.className = $opt.class_prefix + '-row';
    var x;
    for (x = 0; x < date.getDay(); x += 1) {
        tr.appendChild(Object.assign(document.createElement('td'), {
            className: $opt.class_prefix + '-pad',
            innerHTML: ' '
        }));
    }

    for (let running_day_count = 1; running_day_count <= total_days_in_month; running_day_count++) {
        const events = findEvents($opt.events, running_day);
        let classes = [];
        let event_summary = '';

        if (events) {
            for (const ev of events) {
                const dayTime = running_day.getTime();
                const startTime = ev.start.getTime();
                const endTime = ev.end.getTime();

                if (dayTime === startTime) {
                    if (ev.mask) classes.push('mask-start');
                    if (ev.classes) classes.push(ev.classes);
                    if (ev.summary) event_summary += `<li>${ev.summary}</li>`;
                } else if (dayTime > startTime && dayTime < endTime) {
                    if (ev.mask) classes.push('mask');
                } else if (dayTime === endTime) {
                    if (ev.mask) classes.push('mask-end');
                }
            }
        }

        if (running_day.getTime() === today.getTime()) {
            classes.push('today');
        }

        const td = document.createElement('td');
        td.className = `${$opt.class_prefix}-date${classes.length ? ' ' + classes.join(' ') : ''}`;
        td.title = running_day.toLocaleDateString();
        td.innerHTML = `<div class="${$opt.class_prefix}-day">${running_day.getDate()}</div>` +
            (event_summary ? `<ul class="${$opt.class_prefix}-events">${event_summary}</ul>` : '');
        tr.appendChild(td);

        if (running_day.getDay() === 6 || running_day_count === total_days_in_month) {
            tbody.appendChild(tr);
            if (running_day_count !== total_days_in_month) {
                tr = document.createElement('tr');
            }
        }

        running_day.setDate(running_day.getDate() + 1);
    }

    var padding = (7 - tr.children.length) % 7;
    for (x = 0; x < padding; x++) {
        var td = document.createElement('td');
        td.className = $opt.class_prefix + '-pad';
        td.innerHTML = ' ';
        tr.appendChild(td);
    }

    if (tr.children.length) {
        tbody.appendChild(tr);
    }

    var table = document.createElement('table');
    table.className = $opt.class_prefix + '-table';
    table.append(thead, tbody);

    var wrap = document.createElement('div');
    wrap.className = $opt.class_prefix;
    wrap.appendChild(table);

    element.innerHTML = '';
    element.appendChild(wrap);
}

module.exports = Calendar