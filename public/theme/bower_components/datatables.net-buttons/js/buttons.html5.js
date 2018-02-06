(function(i) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(g) {
        return i(g, window, document)
    }) : "object" === typeof exports ? module.exports = function(g, k, q, r) {
        g || (g = window);
        if (!k || !k.fn.dataTable) k = require("datatables.net")(g, k).$;
        k.fn.dataTable.Buttons || require("datatables.net-buttons")(g, k);
        return i(k, g, g.document, q, r)
    } : i(jQuery, window, document)
})(function(i, g, k, q, r, p) {
    function y(a, c) {
        s === p && (s = -1 === v.serializeToString(i.parseXML(z["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"));
        i.each(c, function(c, b) {
            if (i.isPlainObject(b)) {
                var e = a.folder(c);
                y(e, b)
            } else {
                if (s) {
                    var e = b.childNodes[0],
                        f, h, m = [];
                    for (f = e.attributes.length - 1; 0 <= f; f--) {
                        h = e.attributes[f].nodeName;
                        var g = e.attributes[f].nodeValue; - 1 !== h.indexOf(":") && (m.push({
                            name: h,
                            value: g
                        }), e.removeAttribute(h))
                    }
                    f = 0;
                    for (h = m.length; f < h; f++) g = b.createAttribute(m[f].name.replace(":", "_dt_b_namespace_token_")), g.value = m[f].value, e.setAttributeNode(g)
                }
                e = v.serializeToString(b);
                s && (-1 === e.indexOf("<?xml") && (e = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
                    e), e = e.replace(/_dt_b_namespace_token_/g, ":"));
                e = e.replace(/<(.*?) xmlns=""(.*?)>/g, "<$1 $2>");
                a.file(c, e)
            }
        })
    }

    function n(a, c, d) {
        var b = a.createElement(c);
        d && (d.attr && i(b).attr(d.attr), d.children && i.each(d.children, function(a, c) {
            b.appendChild(c)
        }), d.text && b.appendChild(a.createTextNode(d.text)));
        return b
    }

    function I(a, c) {
        var d = a.header[c].length,
            b;
        a.footer && a.footer[c].length > d && (d = a.footer[c].length);
        for (var e = 0, f = a.body.length; e < f && !(b = a.body[e][c].toString(), -1 !== b.indexOf("\n") ? (b = b.split("\n"),
                b.sort(function(a, b) {
                    return b.length - a.length
                }), b = b[0].length) : b = b.length, b > d && (d = b), 40 < d); e++);
        d *= 1.3;
        return 6 < d ? d : 6
    }
    var l = i.fn.dataTable,
        o;
    var h = "undefined" !== typeof self && self || "undefined" !== typeof g && g || this.content;
    if ("undefined" === typeof h || "undefined" !== typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent)) o = void 0;
    else {
        var t = h.document.createElementNS("http://www.w3.org/1999/xhtml", "a"),
            J = "download" in t,
            K = /constructor/i.test(h.HTMLElement) || h.safari,
            A = /CriOS\/[\d]+/.test(navigator.userAgent),
            L = function(a) {
                (h.setImmediate || h.setTimeout)(function() {
                    throw a;
                }, 0)
            },
            B = function(a) {
                setTimeout(function() {
                    "string" === typeof a ? (h.URL || h.webkitURL || h).revokeObjectURL(a) : a.remove()
                }, 4E4)
            },
            C = function(a) {
                return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([String.fromCharCode(65279), a], {
                    type: a.type
                }) : a
            },
            D = function(a, c, d) {
                d || (a = C(a));
                var b = this,
                    d = "application/octet-stream" === a.type,
                    e, f = function() {
                        for (var a = ["writestart", "progress", "write", "writeend"],
                                a = [].concat(a), c = a.length; c--;) {
                            var d = b["on" + a[c]];
                            if ("function" === typeof d) try {
                                d.call(b, b)
                            } catch (e) {
                                L(e)
                            }
                        }
                    };
                b.readyState = b.INIT;
                if (J) e = (h.URL || h.webkitURL || h).createObjectURL(a), setTimeout(function() {
                    t.href = e;
                    t.download = c;
                    var a = new MouseEvent("click");
                    t.dispatchEvent(a);
                    f();
                    B(e);
                    b.readyState = b.DONE
                });
                else if ((A || d && K) && h.FileReader) {
                    var i = new FileReader;
                    i.onloadend = function() {
                        var a = A ? i.result : i.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                        h.open(a, "_blank") || (h.location.href = a);
                        b.readyState =
                            b.DONE;
                        f()
                    };
                    i.readAsDataURL(a);
                    b.readyState = b.INIT
                } else e || (e = (h.URL || h.webkitURL || h).createObjectURL(a)), d ? h.location.href = e : h.open(e, "_blank") || (h.location.href = e), b.readyState = b.DONE, f(), B(e)
            },
            j = D.prototype;
        "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob ? o = function(a, c, d) {
            c = c || a.name || "download";
            d || (a = C(a));
            return navigator.msSaveOrOpenBlob(a, c)
        } : (j.abort = function() {}, j.readyState = j.INIT = 0, j.WRITING = 1, j.DONE = 2, j.error = j.onwritestart = j.onprogress = j.onwrite = j.onabort = j.onerror = j.onwriteend =
            null, o = function(a, c, d) {
                return new D(a, c || a.name || "download", d)
            })
    }
    l.fileSave = o;
    var u = function(a, c) {
            var d = "*" === a.filename && "*" !== a.title && a.title !== p ? a.title : a.filename;
            "function" === typeof d && (d = d()); - 1 !== d.indexOf("*") && (d = i.trim(d.replace("*", i("title").text())));
            d = d.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");
            return c === p || !0 === c ? d + a.extension : d
        },
        M = function(a) {
            var c = "Sheet1";
            a.sheetName && (c = a.sheetName.replace(/[\[\]\*\/\\\?\:]/g, ""));
            return c
        },
        N = function(a) {
            a = a.title;
            "function" === typeof a &&
                (a = a());
            return -1 !== a.indexOf("*") ? a.replace("*", i("title").text() || "Exported data") : a
        },
        E = function(a) {
            return a.newline ? a.newline : navigator.userAgent.match(/Windows/) ? "\r\n" : "\n"
        },
        F = function(a, c) {
            for (var d = E(c), b = a.buttons.exportData(c.exportOptions), e = c.fieldBoundary, f = c.fieldSeparator, i = RegExp(e, "g"), m = c.escapeChar !== p ? c.escapeChar : "\\", h = function(a) {
                        for (var b = "", c = 0, d = a.length; c < d; c++) 0 < c && (b += f), b += e ? e + ("" + a[c]).replace(i, m + e) + e : a[c];
                        return b
                    }, g = c.header ? h(b.header) + d : "", k = c.footer && b.footer ? d +
                    h(b.footer) : "", w = [], x = 0, j = b.body.length; x < j; x++) w.push(h(b.body[x]));
            return {
                str: g + w.join(d) + k,
                rows: w.length
            }
        },
        G = function() {
            if (!(-1 !== navigator.userAgent.indexOf("Safari") && -1 === navigator.userAgent.indexOf("Chrome") && -1 === navigator.userAgent.indexOf("Opera"))) return !1;
            var a = navigator.userAgent.match(/AppleWebKit\/(\d+\.\d+)/);
            return a && 1 < a.length && 603.1 > 1 * a[1] ? !0 : !1
        };
    try {
        var v = new XMLSerializer,
            s
    } catch (O) {}
    var z = {
            "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
            "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
            "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
            "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
            "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/></worksheet>',
            "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><numFmts count="6"><numFmt numFmtId="164" formatCode="#,##0.00_- [$$-45C]"/><numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/><numFmt numFmtId="166" formatCode="[$€-2] #,##0.00"/><numFmt numFmtId="167" formatCode="0.0%"/><numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/><numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/></numFmts><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="67"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="left"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="center"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="right"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment horizontal="fill"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment textRotation="90"/></xf><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1"><alignment wrapText="1"/></xf><xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="1" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/><xf numFmtId="2" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
        },
        H = [{
                match: /^\-?\d+\.\d%$/,
                style: 60,
                fmt: function(a) {
                    return a / 100
                }
            }, {
                match: /^\-?\d+\.?\d*%$/,
                style: 56,
                fmt: function(a) {
                    return a / 100
                }
            }, {
                match: /^\-?\$[\d,]+.?\d*$/,
                style: 57
            }, {
                match: /^\-?£[\d,]+.?\d*$/,
                style: 58
            }, {
                match: /^\-?€[\d,]+.?\d*$/,
                style: 59
            }, {
                match: /^\-?\d+$/,
                style: 65
            }, {
                match: /^\-?\d+\.\d{2}$/,
                style: 66
            }, {
                match: /^\([\d,]+\)$/,
                style: 61,
                fmt: function(a) {
                    return -1 * a.replace(/[\(\)]/g, "")
                }
            }, {
                match: /^\([\d,]+\.\d{2}\)$/,
                style: 62,
                fmt: function(a) {
                    return -1 * a.replace(/[\(\)]/g, "")
                }
            }, {
                match: /^\-?[\d,]+$/,
                style: 63
            },
            {
                match: /^\-?[\d,]+\.\d{2}$/,
                style: 64
            }
        ];
    l.ext.buttons.copyHtml5 = {
        className: "buttons-copy buttons-html5",
        text: function(a) {
            return a.i18n("buttons.copy", "Copy")
        },
        action: function(a, c, d, b) {
            var a = F(c, b),
                e = a.str,
                d = i("<div/>").css({
                    height: 1,
                    width: 1,
                    overflow: "hidden",
                    position: "fixed",
                    top: 0,
                    left: 0
                });
            b.customize && (e = b.customize(e, b));
            b = i("<textarea readonly/>").val(e).appendTo(d);
            if (k.queryCommandSupported("copy")) {
                d.appendTo(c.table().container());
                b[0].focus();
                b[0].select();
                try {
                    var f = k.execCommand("copy");
                    d.remove();
                    if (f) {
                        c.buttons.info(c.i18n("buttons.copyTitle", "Copy to clipboard"), c.i18n("buttons.copySuccess", {
                            1: "Copied one row to clipboard",
                            _: "Copied %d rows to clipboard"
                        }, a.rows), 2E3);
                        return
                    }
                } catch (h) {}
            }
            f = i("<span>" + c.i18n("buttons.copyKeys", "Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.") + "</span>").append(d);
            c.buttons.info(c.i18n("buttons.copyTitle", "Copy to clipboard"), f, 0);
            b[0].focus();
            b[0].select();
            var m = i(f).closest(".dt-button-info"),
                g = function() {
                    m.off("click.buttons-copy");
                    i(k).off(".buttons-copy");
                    c.buttons.info(!1)
                };
            m.on("click.buttons-copy", g);
            i(k).on("keydown.buttons-copy", function(a) {
                27 === a.keyCode && g()
            }).on("copy.buttons-copy cut.buttons-copy", function() {
                g()
            })
        },
        exportOptions: {},
        fieldSeparator: "\t",
        fieldBoundary: "",
        header: !0,
        footer: !1
    };
    l.ext.buttons.csvHtml5 = {
        bom: !1,
        className: "buttons-csv buttons-html5",
        available: function() {
            return g.FileReader !== p && g.Blob
        },
        text: function(a) {
            return a.i18n("buttons.csv",
                "CSV")
        },
        action: function(a, c, d, b) {
            a = F(c, b).str;
            c = b.charset;
            b.customize && (a = b.customize(a, b));
            !1 !== c ? (c || (c = k.characterSet || k.charset), c && (c = ";charset=" + c)) : c = "";
            b.bom && (a = "﻿" + a);
            o(new Blob([a], {
                type: "text/csv" + c
            }), u(b), !0)
        },
        filename: "*",
        extension: ".csv",
        exportOptions: {},
        fieldSeparator: ",",
        fieldBoundary: '"',
        escapeChar: '"',
        charset: null,
        header: !0,
        footer: !1
    };
    l.ext.buttons.excelHtml5 = {
        className: "buttons-excel buttons-html5",
        available: function() {
            return g.FileReader !== p && (q || g.JSZip) !== p && !G() && v
        },
        text: function(a) {
            return a.i18n("buttons.excel",
                "Excel")
        },
        action: function(a, c, d, b) {
            var e = 0,
                a = function(a) {
                    return i.parseXML(z[a])
                },
                f = a("xl/worksheets/sheet1.xml"),
                h = f.getElementsByTagName("sheetData")[0],
                a = {
                    _rels: {
                        ".rels": a("_rels/.rels")
                    },
                    xl: {
                        _rels: {
                            "workbook.xml.rels": a("xl/_rels/workbook.xml.rels")
                        },
                        "workbook.xml": a("xl/workbook.xml"),
                        "styles.xml": a("xl/styles.xml"),
                        worksheets: {
                            "sheet1.xml": f
                        }
                    },
                    "[Content_Types].xml": a("[Content_Types].xml")
                },
                c = c.buttons.exportData(b.exportOptions),
                m, k, d = function(a) {
                    m = e + 1;
                    k = n(f, "row", {
                        attr: {
                            r: m
                        }
                    });
                    for (var b = 0,
                            c = a.length; b < c; b++) {
                        for (var d = b, g = ""; 0 <= d;) g = String.fromCharCode(d % 26 + 65) + g, d = Math.floor(d / 26) - 1;
                        var d = g + "" + m,
                            j = null;
                        if (!(null === a[b] || a[b] === p || "" === a[b])) {
                            a[b] = i.trim(a[b]);
                            for (var l = 0, o = H.length; l < o; l++)
                                if (g = H[l], a[b].match && a[b].match(g.match)) {
                                    j = a[b].replace(/[^\d\.\-]/g, "");
                                    g.fmt && (j = g.fmt(j));
                                    j = n(f, "c", {
                                        attr: {
                                            r: d,
                                            s: g.style
                                        },
                                        children: [n(f, "v", {
                                            text: j
                                        })]
                                    });
                                    break
                                }
                            j || ("number" === typeof a[b] || a[b].match && a[b].match(/^-?\d+(\.\d+)?$/) && !a[b].match(/^0\d+/) ? j = n(f, "c", {
                                attr: {
                                    t: "n",
                                    r: d
                                },
                                children: [n(f,
                                    "v", {
                                        text: a[b]
                                    })]
                            }) : (g = !a[b].replace ? a[b] : a[b].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ""), j = n(f, "c", {
                                attr: {
                                    t: "inlineStr",
                                    r: d
                                },
                                children: {
                                    row: n(f, "is", {
                                        children: {
                                            row: n(f, "t", {
                                                text: g
                                            })
                                        }
                                    })
                                }
                            })));
                            k.appendChild(j)
                        }
                    }
                    h.appendChild(k);
                    e++
                };
            i("sheets sheet", a.xl["workbook.xml"]).attr("name", M(b));
            b.customizeData && b.customizeData(c);
            b.header && (d(c.header, e), i("row c", f).attr("s", "2"));
            for (var j = 0, l = c.body.length; j < l; j++) d(c.body[j], e);
            b.footer && c.footer && (d(c.footer, e), i("row:last c", f).attr("s", "2"));
            d = n(f, "cols");
            i("worksheet", f).prepend(d);
            j = 0;
            for (l = c.header.length; j < l; j++) d.appendChild(n(f, "col", {
                attr: {
                    min: j + 1,
                    max: j + 1,
                    width: I(c, j),
                    customWidth: 1
                }
            }));
            b.customize && b.customize(a);
            c = new(q || g.JSZip);
            d = {
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
            y(c, a);
            c.generateAsync ? c.generateAsync(d).then(function(a) {
                o(a, u(b))
            }) : o(c.generate(d), u(b))
        },
        filename: "*",
        extension: ".xlsx",
        exportOptions: {},
        header: !0,
        footer: !1
    };
    l.ext.buttons.pdfHtml5 = {
        className: "buttons-pdf buttons-html5",
        available: function() {
            return g.FileReader !== p && (r || g.pdfMake)
        },
        text: function(a) {
            return a.i18n("buttons.pdf", "PDF")
        },
        action: function(a, c, d, b) {
            E(b);
            var a = c.buttons.exportData(b.exportOptions),
                e = [];
            b.header && e.push(i.map(a.header, function(a) {
                return {
                    text: "string" === typeof a ? a : a + "",
                    style: "tableHeader"
                }
            }));
            for (var f = 0, h = a.body.length; f < h; f++) e.push(i.map(a.body[f], function(a) {
                return {
                    text: "string" === typeof a ? a : a + "",
                    style: f % 2 ? "tableBodyEven" : "tableBodyOdd"
                }
            }));
            b.footer && a.footer && e.push(i.map(a.footer, function(a) {
                return {
                    text: "string" ===
                        typeof a ? a : a + "",
                    style: "tableFooter"
                }
            }));
            a = {
                pageSize: b.pageSize,
                pageOrientation: b.orientation,
                content: [{
                    table: {
                        headerRows: 1,
                        body: e
                    },
                    layout: "noBorders"
                }],
                styles: {
                    tableHeader: {
                        bold: !0,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154",
                        alignment: "center"
                    },
                    tableBodyEven: {},
                    tableBodyOdd: {
                        fillColor: "#f3f3f3"
                    },
                    tableFooter: {
                        bold: !0,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154"
                    },
                    title: {
                        alignment: "center",
                        fontSize: 15
                    },
                    message: {}
                },
                defaultStyle: {
                    fontSize: 10
                }
            };
            b.message && a.content.unshift({
                text: "function" == typeof b.message ?
                    b.message(c, d, b) : b.message,
                style: "message",
                margin: [0, 0, 0, 12]
            });
            b.title && a.content.unshift({
                text: N(b, !1),
                style: "title",
                margin: [0, 0, 0, 12]
            });
            b.customize && b.customize(a, b);
            c = (r || g.pdfMake).createPdf(a);
            "open" === b.download && !G() ? c.open() : c.getBuffer(function(a) {
                a = new Blob([a], {
                    type: "application/pdf"
                });
                o(a, u(b))
            })
        },
        title: "*",
        filename: "*",
        extension: ".pdf",
        exportOptions: {},
        orientation: "portrait",
        pageSize: "A4",
        header: !0,
        footer: !1,
        message: null,
        customize: null,
        download: "download"
    };
    return l.Buttons
});