import { useState, useEffect, useRef } from "react";

// ═══ Shared palette ═══
const C = {
  primary: "#33543E", primaryDark: "#274230", primaryDeep: "#1C3224",
  primaryLight: "#558B68", primarySoft: "#E6EFE9", primaryGhost: "#F3F8F5",
  bg: "#FAFAF7", card: "#FFFFFF", surface: "#EEEFEB",
  surfaceWarm: "#F2EEE8", surfaceWarmEdge: "#E0DACB",
  surfaceCool: "#EBEDF0", surfaceCoolEdge: "#D1D5DB",
  text: "#1E261F", textSec: "#4A4F4A", textMuted: "#8A8F8A",
  border: "#D8DFD8", borderLight: "#E8ECE6",
  sidebar: "#1E261F", sidebarAccent: "#558B68",
  heroGrad: "linear-gradient(135deg, #1E261F, #2A382C)",
  danger: "#C4432B", dangerBg: "#FAE8E4",
  warning: "#B88B15", warningBg: "#FBF2DC",
  success: "#2D8659", successBg: "#E2F3EB",
  btn: "#5B21B6", btnHover: "#4C1D95",
  btnSoft: "rgba(91,33,182,0.06)", btnLight: "#C4A5F0",
  cardShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  raiGrad: "linear-gradient(145deg, #1E261F 0%, #33543E 55%, #558B68 100%)",
};


const HEADSHOT = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAGmASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLxaRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDuKKKKszCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACijB9DR2z2oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiud8V64NOtjbQPi5lXlh/yzX1+ppPQaVyfWfEtlpRaPPnXA6op4X6nt9K4q/wDFWo3jN/pDRRk/6uL5OPr1NYrnzHJJY5qzFps8ygpEzKfaocjRRGLeOzENLJ8395yc/WpbfVru0YGCeVdp/hcjH4Z5qb+wbtyAIXyeM4/KnzeHrqBxuU4PtSuiuVl618banblWuBHdRZwcgKT+I716FZ3UV7aRXMDh4pFDAj+X1ryC5sLizYrJGQD2IqXTNVu9Ju0lt5GVRjdFn5XHoRVKRDiewUVU0zUINUskurYnY3BB6qfQ1bqzMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAryrxHdtfaxdSZygcovptHAFepSsUhkcdVUkfgK8fkfzHbPJPP4+tTIuJPpdust0isOMjivTbO2iWFAiAACuA0K2ee9RYgTz8xxwK9JhURoFHYVhLc6IbDhGo7CmvGrdQKkLGkz7UizPvLCG5TbKgb3xXKa7oEQheSFdrAZruHIIrG1ZgttIx6BTRtsFk1qc34GvTa6q9kTiK5UkKezj/ABGfyr0KvILC5a31q1mTl45VP15/wr188E10R2OSS1CiiiqICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCO4x9mlz/cI/SvI0RzMV2nfnBHfPpXrNyN3lp2LZNczqFjG3iiJlUYKeY/uQf8A9VYzlqdEKfu3L+k2celaei7MysNzkdSfSknvNXOWgtoETsJX5rQZXMXykK3qe1YF/ogvY1E1wxkDFi7DJPt6YrFPXU3cdNDU0++1KSUR3drEq/30b+lak0qwoXboBWZZRGEqqLsjUAAc9h1/Gk1C6cAAEdafMPlBtc07eYzdIj+jcVm+IJfM02T7O4cYzlTkGqV08rX80U+m21zagFhJs2Er6gnqfai3too0aS03fZJVztY9Dim9Cdzm/DtqbvxDZx548wMfovJ/lXrvWvPvh/aF9UubkqdsMe0H/aY/4A16DXQjjluFFFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFe63DY6jJGaooFaVSUKyZO7I57Vqsu5SDVOZWWZS2Olc9SOtzrpTXLyk4X5RTGVUJJIFRySuI/kxu6Z9KiQMynad2epPeoNUSqjSc8gHpnvWbeoFucHoDirXkskglUfvMbc5PT0rPeKRZmMpZt/JyePw9KTRaZea2+QAD5fQ9qo3yJBbMqDCrzitaGYMgU+nFZl9teZUYZQn5h6ilYCHwdbeTbIw+Xem9x6k9K6is/S4NivLjCucKPYVoV1Q2OGrbm0CiiirMgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKp3pxKn0q5VK9G5xjsKzqfCa0viGoQcg9GGarSWaRXSXWwug4dM9vX605H9eoq2rfL161gjqTsxiGzlQFRPC3cA9Kzr+SOIgW9y0khbGxkzmrchG/BjU49DVYwqJfM24I9e1U3oWrdyzDG2xWbggcj3qvb2/wBrvmOf3aD5vf2oubxY4tgJJPp1PtWjpts1vb5kGJZDuYenoKIRuzGpPlRbAAAAGAOgooorpOMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAJABJIAHJJ7Vxel+JrefUruC6k2LLMWgkY/LjoF9unH1pfGHiSNbdrCwlWRnyszqc7R/dB9T3rgW5pSjdWZcG4u56xOuckHmkhvEC7JOHXse9ef6V4ivdOAjJ8+3H/LNz0+h7V0cOsaZqQAE32eY/wS8fr0NYcjidCmpHQtc2+Oo3Y9azr+9EMeQeT90VXk027K/u5o9vZgTWbdfZbFi93dh5MdM5P4CluO7NXQVe41NHk5CAtz611lcJ4S1D+0PEJVFMcMUDlVJ5YkgZNd3W0FZHPUd2FFFFWZhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFQ3V3b2cXm3U0cMf95zj/8AXQBNRXLXvjfT4ci1iluG9SNi/rz+lcxqnivUtQBRJhbxH+CLIz9T1osM7nVvEWn6UCssvmTD/llHy349h+NcNrHi6/1HdHE32W3PGyM8ke7VzzE5yTmmnmgdh9NzSBqXNABSHFGKOaQxwmlVdqyyBfQMQKZ3zRz6Uc0AavhzVBpGrxXLgmLBSQAZO0+n6V6xZ3ltf24ntJkmjPdT0+vpXiNWbG+utPnE1nO8Mnqp6/Ud6BNHtlFcJpnj0jamp227/prD/Vf8K6i08QaVdgGK+hBP8LnYfyNMRp0U1HSQZR1cf7JBp1AgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorL8Rap/ZOlSTrjzm+SIH+8e/4daAMnxF4tTT5HtLFVluV4Z2+6h9Mdz+lcFeX9zezGW6meWQ92OcfT0qF2Z2LMSSTkk96Zx3plATTT6/rSnjkcik96QCHn60maU0nekMKBxRQKAFoo6GkIxyKAFpPzo5o5oASilx60GgAB9KXcfWk7UCgCWC5mt3DwyPGw7oxB/Suj03xtqNqQt1tu4/8Ab4b/AL6H9a5f1ooCx7Bo+vWOsJ/o0m2UDLQvww/xHuK1K8Qt55baZJoZGjlQ5VlOCDXq3hfWP7Y0tZJGBuYjsmAGOexx7j+tMlo2aKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVwXxBuC17aWwPypGXI9ycfyFd7Xnnj5SutQsejQL/ADNCGcqRTaeR+FMPo3B7GmMbjnjg0nfpz6U76/nSH3/OkA2k/oacaTufrSGJR3p2KCOlABjIoFA60dDQAmMHFLQRke4pB0oAKTvTu1IBQAGhe9FA6UAHY0Uv8NFAAK3fCGpHT9chDNiG4PlSenPQ/gawiaFJUhl4I5FMR7lRVXTbr7bptrc/89olc/XHP61aoJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAriviFBkWU+P70Z/Qj+tdrXP+Nrbz/D0jj70DrIPp0P8AOhDPMskcdRSE5p2cimkimMYeKM0pweh/A00ikAhHp0o9fwoPSgc0hj6D0pRRTENxQ3UGnU1vu0AIOCKAMEig96d1waAEI4oxS0UAJSHhfxp1I3SgBD900dTQeho6CkMMUHil5ppNAHqngmYTeGbYZyYi0Z9sHP8AWt+uL+HE5azvoCfuSK4H1GD/ACrtKZIUUUUCCiiigAooooAKKKKACiiigAooooAKKKKACs/Xk36Ffr/0wY/kM1oVBex+bY3Ef9+Jx+hoA8ZYYY46U01Iw4phFNlEZp8Mck0ixRI0jscBVGSaQrnvWt4Wu1sNftpZJI44zlHd+gUipeg1qyHTtEvNRvntI1WKZELlZsqcenSqdzaT2VzJb3MbRSqeVb/PNewTQwTtFcMFZxzHNHzjPv6fpWZr2ipq1kFlKLMozFOo7+/saz59Td0lbQ8vFFSXNvNaXD29whSVDgg/z+lRZrUwFpKDQKBDRTl+7im/x0q8MRQA6iikoAU01qU01uhoATPFO6c03PApw6ZP4UhiH3pvelPNJQB1HgK9+za4YGPy3SFP+BDkf1r0yvEbWd7W6injOHiYOv1Br2m2nS6toriM5SVA6/QimSyWiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUYzweh4oooA8avYjBeTRHrHIy/karkV0PjOzNrr0rgYS4AlU+/Q/qK5+mUNI/Ck2kU+g4AyT0oA3fCmoXdpctFHewRQEf6i5YhJD6A/wn3/AJ16TCyyW4kiHyMOUJBwfwrxcDd16elWrO/u7LebW5lgDcYRsDAqHC5pGdtDpvHVhughvozlY22H2BPT8D/OuLBzWhNql9NC8Mt3NJE/3kZsg1RwPQURi0KclJ3EJoBowKTB7VRAHqDR/Fmgg4owaBjieKbml69+KUKBz1oEIDxSHoa6jQIBdabJsih+0IxEZK5MnGSCP88GkvtNgukKGAWt3yUYDCyY7FRwD6GhjscsOop/XmkeN4nCyIyH0IxThSQMTFIaecAU0gntimA2vSfAWo/adJezc/vLVuP9w9PyORXm5FdD4Hujb+I4kzhZ1aMj3xkfqKQmeo0UUUyQooooAKKKKACiiigAooooAKKKKACiiigAooooAxPFOj/2tpv7oZuYctH/ALXqv4/zrzAgqSCCCOxr2quD8baKIJf7St1xHK2JVHZvX8f500M5CmSZO0Dp1p4pcZoGIBikxTsYpDQA000inUhoAbikpaDSAM8UZpuaTNACk/zpQaa3Ax+NGaQy5Y309hcebbtgkYI9R/T611n9px3uliZ2lSZnVSqIBvySvqOevPTjNcPu6VZWYmNI2VHRTuAbP5fSh6gjudS0WG80RVRWjZE3R5IPQcdOOR6VwABx0xWnfaxe342zTsIwMCNPlUD0wKz6UY2KlK4wjHr+FNJPWpCOKaw7iqJEyD14rU8Lg/8ACS6cB184fyNZP06fyrZ8JDd4nsPaQn/x00hHrVFFFMkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsjxVH5nh289UUOPwIrXqpqsXn6VeRf3oWH6UAeQ8HkdP5UoqONsE+lPz6VQx24d6jYikJxUbNSGOJFNLYphNJSuMdmkzRRmkIKXhRk9aTNITmgYHnJPegZPSlC9zT+KLANC+nNOB9z+NLxR+FMQuRS5ptHIoAU0hooxQA3HBrc8Fxl/FFoR/CHY/gprFIrrfh3al9Ruror8sUewH3Y/4CgD0KiiigkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkdd6Mv94EUtA6igDxQrteRf7pIqMEir2qQm31a9iIxslcfrVIDmmUMZiTUZNSFeaaVqWMbmjNGKMUtQDNGaNtHSgAAJp2ML70gbFLmmA7r7UuKYDjg0u73piFwR3pfm9jTd1G+gBdx7rS5FN30Ll2VVGWYgCgY/NGa6ODwPq8v+t+zwD/akyfyAqyfh/fYGL62J9NrUCORJzXqng2xNl4eg3DEk+Zm/Hp+mKw9O8BMlwr6hdRyRKcmOIH5vYk9BXcABQAAAAMADtQJi0UUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8t8WQ+V4jvvRiHH4gVid66bx2mzXgw/jhQ/lkVzWKYxp60hFOI5oIoGR4pdtOxQBSAbgUhWpKaaAGFRTSDTzRilYZHmlJ9qccDgcmjGOTRYBlJT8Z5pD1pWAbUtspa5gUdWkUD8xTMVb0oKdWsQ/3fPTP/fQosB7SepooPU/WiqICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDgfiBERqVpLjhoSufcN/wDXrkdwJrsPH+oQPc29iEzLF87SZ6bh93+RrjioHWmMXjPWijB+tGDQMQ0nOKfjiggCgBuDTcU4vjpUZY0gFJAFMLE9KMU4CkMRRilNBwKbmmIXpSUUAUgF7VPpqs+qWiqMkzJj/voVD2rV8KhP+El04PjHm9/XBx+tMD109T9aSiigkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKB1FAHk3iiQy+Ib5j0EpH5cf0rNA3KR2xwat6lcJJqN3I3IeZ2/U1Ra4GMIuBTukMkUEU7BqsZnbpSEyN3NK47FkkUxmX1qHYe5oEdF2A8lfUUm5fWk8sUFFo1ANy0hcUbB6il2gelLUY3cD2peD0peP8ikOewoAKM005pME0AKWq7oySS6zYrFneZ0xj61TC1Y0+5ay1C3uUODFIrfkef0oA9rPU0UyKWOaJJYmDxuAysOhB6U+mQFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFRXTtHazPGpZ1jYqB3ODipajnmW3t5Jn+7Gpc/gM0AeJbJJHy2Qe+akS3Bqa4uGnuJJ3+/Ixc49Sc1C0rsMDiiyKFMYXrgU0sg75pmwnlmJoKAUABkHYUnmGjAHSkyKQw3mkyTS7h6UmR6UAH40EUZXuKDjsKQDaXJoo/CgYZNLuNHNHHegQbiaMk+1GfSjHrTA9W8FyCTwxa/PuKFlPt8x4rerh/hvLmPUId3Qo4X8xn+VdxTJCiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABWV4mLDw5qBXr5J/mK1azPEhx4ev+QCYioz6nigDySg0MMEgjkUygoU80dKSkzQAE0Z9qKSkAZ9qTP8As0tJQMM+1H4UtIaAEyaOaKKQBRRS0wCigAk4AJqZbZjyxCj9aAN7wFIyeI0UPtV4nDD+9xkfyr1CvItBnWz1yzmHCrKoP0PB/nXrvTiglhRRRTEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVzPja58vT4LcHHnSZP0Uf4mumriPHbE31mvYRMf1pDOb2RyIRIgY9jURsoWPDMv605WNP3ZoGQNpjYykoP1FRHTp88bT+NXt5HTpT1mGetMDLaxuF/gH50z7JP/wA8zWsJRTvOU0gMb7PN/wA82pPs83/PJvyraEiHpTgRwR6UAYYglPSNvyoa3mVdxjYCtrORiop/uYPqP50AZIt5T/AfxqVLGQ/eIWrhcLmo3nJ4UUDGfZIkGWYt+lN2p0RAPelwW+8aeAFoEIiYFEnTFO3gZqJ2LH2oAYpImTHXcMfnXtf1rxvS4ftOsWcH9+ZB+Ga9kPU0IGFFFFMkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArh/HoK3tm5HymJgD75/8Ar13Fch49RmjsW2/IGcbvQ8cfpSGjjVbIFOHXrTAMGn8UDHEkdqaTnNGTTc8d6AHZFOG09xUZHvTcnnGDQBNtHrTun8VVvmFNZyB3oAs79oGDUMsgIwe5H86gLyN06VEzksAaBk7OtM8z0piruNTJB60gGhyad8xHWpRCB3pSoFMRGAAKidhzipHz0xUTDFAyzos3ka3ZS/3JlP64r2M8HFeJ23F1Ef8AbX+de2HrQhMKKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXP8AjSLzNBZx1ilVv6f1roKztfh+0aFex9/KLD8Of6UDPMRz14pSOgNMDcetOJ9KQwI4plKTSZoAXIHJoMgA4FNJHOf501nRRQAryZ6CoHekebJ46VEzGkMcXIqIuS2Sc0hOaO1IZKHI6U4PM33QxqJWIqYXB70xCeZKPWl86TvUyzKR0pfMT+7QBCGY9aVulPLjHA5qJjQAinEqkete2qcop9QK8SUZlQDuQK9tUYUD0GKaExaKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUdwu+2lT+8jD9KkoIyMetAHjgHApSfWlcFZGA7Mf50yRuMYpFCZzSBsetMNL2NACbiaibLGpCcLURIA96QxpwKYT9KGOTSUgE6mlNdPZ6E48FX1/JH+8kKSRevlqeT+OT+VcuaBjhT1wewpg6U5TTEPJA6CgP7U0LuPNPCigBwOaa3WnYwKY33qAH2w3XcIHeRR+or2w9TXjGlr5mrWaf3p0H/jwr2c9T9aaEwooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFKOo+tFFAHkN6uy9uAO0rj9TVUjPNFFIoac55oY/LRRQBE2aiIoopDExUlrAbm6hgDBTK6oD6ZOKKKQz2VtOiOknTcnyvJ8jPfGMZrxeaPypnjznYxXPrg4oopslDQOKcBRRQMkUU7OKKKAFGTTXHP4UUUAaHhuLzfEWnoennKfy5/pXr1FFNEsKKKKYgooooAKKKKACiiigAooooA//9k=";

const inputStyle = { width: "100%", padding: "14px 16px", border: "2px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", background: C.card, boxSizing: "border-box", outline: "none" };

// ═══ Reveal on Scroll ═══
function Reveal({ children, direction = "up", delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(32px)", down: "translateY(-32px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : (transforms[direction] || transforms.up), transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ═══ Swipe Drawer ═══
function SwipeDrawer({ open, setOpen, children }) {
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);
  const drawerRef = useRef(null);
  const DRAWER_W = 280;
  const EDGE_ZONE = 30;

  // Touch on overlay or edge of screen
  const handleTouchStart = (e) => {
    const x = e.touches[0].clientX;
    if (open) {
      startX.current = x;
      dragging.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (!dragging.current) return;
    currentX.current = e.touches[0].clientX;
    const diff = startX.current - currentX.current;
    if (diff > 0 && drawerRef.current) {
      drawerRef.current.style.transform = `translateX(${-diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = startX.current - currentX.current;
    if (diff > 80) {
      setOpen(false);
    }
    if (drawerRef.current) {
      drawerRef.current.style.transform = "";
    }
  };

  // Edge swipe to open
  useEffect(() => {
    const onTouchStart = (e) => {
      const x = e.touches[0].clientX;
      if (!open && x < EDGE_ZONE) {
        startX.current = x;
        dragging.current = true;
      }
    };
    const onTouchMove = (e) => {
      if (!dragging.current || open) return;
      currentX.current = e.touches[0].clientX;
    };
    const onTouchEnd = () => {
      if (!dragging.current || open) return;
      dragging.current = false;
      const diff = currentX.current - startX.current;
      if (diff > 60) {
        setOpen(true);
      }
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [open, setOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,.4)", zIndex: 150,
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />
      {/* Drawer */}
      <div
        ref={drawerRef}
        onClick={e => e.stopPropagation()}
        style={{
          position: "fixed", top: 0, left: 0, width: DRAWER_W, height: "100%",
          background: C.card, zIndex: 200,
          boxShadow: open ? "4px 0 24px rgba(0,0,0,.1)" : "none",
          transform: open ? "translateX(0)" : `translateX(-${DRAWER_W}px)`,
          transition: "transform 0.3s ease",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}

// ═══ Nav ═══
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [mobilePlatformExpanded, setMobilePlatformExpanded] = useState(false);
  const closeTimer = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openPlatform = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setPlatformOpen(true);
  };
  const closePlatform = () => {
    closeTimer.current = setTimeout(() => setPlatformOpen(false), 150);
  };

  const features = [
    { id: "feature-today", label: "Today", desc: "One page. Every priority.", icon: "◉" },
    { id: "feature-scoring", label: "Retention Score", desc: "1–99, based on 12 dimensions.", icon: "◎" },
    { id: "feature-health", label: "Health Checks", desc: "Five questions. Two minutes.", icon: "♡" },
    { id: "feature-rai", label: "Talk to Rai", desc: "AI advisor for your book.", icon: "✦" },
    { id: "feature-rolodex", label: "Rolodex", desc: "Forward-looking pipeline.", icon: "⟐" },
    { id: "feature-referrals", label: "Referrals", desc: "Who's ready, with data.", icon: "⟡" },
  ];
  const audiences = [
    { id: "freelancers", label: "Freelancers", desc: "For the one person holding every relationship.", icon: "⟣" },
    { id: "agencies", label: "Agencies", desc: "For the team sharing the book.", icon: "⟢" },
  ];

  const topLinks = [
    { id: "pricing", label: "Pricing" },
    { id: "blog", label: "Resources" },
    { id: "about", label: "About" },
  ];

  const platformActive = ["platform", "freelancers", "agencies", "enterprise", "feature-today", "feature-scoring", "feature-health", "feature-rai", "feature-rolodex", "feature-referrals"].includes(page);

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: C.bg, borderBottom: scrolled ? "1px solid " + C.border : "1px solid transparent", boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.06)" : "none", transition: "box-shadow 0.2s, border-color 0.2s" }}>
        <div className="r-nav-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", maxWidth: 1600, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="r-mobile-only" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", cursor: "pointer", padding: 2, display: "flex", alignItems: "center", zIndex: 110 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="2.5" strokeLinecap="round">
                {open ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="12" x2="17" y2="12" /><line x1="3" y1="17" x2="21" y2="17" /></>}
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
            </div>
          </div>
          <div className="r-desktop-nav" style={{ display: "none", alignItems: "baseline", gap: 28, position: "relative" }}>
            {/* Platform mega-menu trigger */}
            <div
              onMouseEnter={openPlatform}
              onMouseLeave={closePlatform}
              style={{ position: "relative" }}
            >
              <span
                onClick={() => setPage("platform")}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === "Enter" && setPage("platform")}
                style={{
                  fontSize: 15,
                  fontWeight: platformActive ? 700 : 600,
                  color: platformActive ? C.primary : C.text,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  borderBottom: platformActive ? "2px solid " + C.btn : "2px solid transparent",
                  paddingBottom: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                Platform
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6, transform: platformOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginRight: -14 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>

              {/* Mega menu */}
              {platformOpen && (
                <div
                  onMouseEnter={openPlatform}
                  onMouseLeave={closePlatform}
                  style={{
                    position: "absolute",
                    top: "calc(100% + 10px)",
                    left: "-14px",
                    background: C.card,
                    border: "1px solid " + C.border,
                    borderRadius: 16,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.04)",
                    padding: 24,
                    minWidth: 720,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 24,
                    zIndex: 100,
                    animation: "megaFadeIn 0.2s ease",
                  }}
                >
                  {/* Features column */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, padding: "0 10px 10px", marginBottom: 4, borderBottom: "1px solid " + C.borderLight }}>Features</div>
                    {features.map((f, i) => (
                      <div
                        key={i}
                        onClick={() => { setPage(f.id); setPlatformOpen(false); }}
                        className="r-mega-row"
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ width: 32, height: 32, borderRadius: 8, background: C.primarySoft, color: C.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700 }}>{f.icon}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{f.label}</span>
                          <span style={{ fontSize: 11.5, color: C.textSec, lineHeight: 1.4 }}>{f.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* For who column */}
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.textMuted, padding: "0 10px 10px", marginBottom: 4, borderBottom: "1px solid " + C.borderLight }}>For who</div>
                    {audiences.map((a, i) => (
                      <div
                        key={i}
                        onClick={() => { setPage(a.id); setPlatformOpen(false); }}
                        className="r-mega-row"
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: 10,
                          borderRadius: 8,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ width: 32, height: 32, borderRadius: 8, background: a.accent ? "rgba(91,33,182,0.12)" : C.primarySoft, color: a.accent ? C.btn : C.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700 }}>{a.icon}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{a.label}</span>
                          <span style={{ fontSize: 11.5, color: C.textSec, lineHeight: 1.4 }}>{a.desc}</span>
                        </div>
                      </div>
                    ))}

                    {/* Enterprise CTA footer */}
                    <div style={{ marginTop: 14, padding: "14px 14px", borderRadius: 10, background: `linear-gradient(135deg, ${C.primaryDeep} 0%, ${C.primary} 100%)`, color: "#fff", cursor: "pointer" }} onClick={() => { setPage("enterprise"); setPlatformOpen(false); }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: C.primaryLight, marginBottom: 3 }}>Retayned Enterprise · Early access</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>For teams and agents managing your book.</div>
                      <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 4 }}>
                        Learn more
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other top-level links */}
            {topLinks.map(l => (
              <span key={l.id} onClick={() => setPage(l.id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(l.id)} style={{ fontSize: 15, fontWeight: page === l.id ? 700 : 600, color: page === l.id ? C.primary : C.text, cursor: "pointer", letterSpacing: "-0.01em", borderBottom: page === l.id ? "2px solid " + C.btn : "2px solid transparent", paddingBottom: 2, transition: "border-color 0.2s" }}>{l.label}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="r-desktop-nav" onClick={() => setPage("login")} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage("login")} style={{ fontSize: 14, fontWeight: 600, color: C.textSec, cursor: "pointer" }}>Log In</span>
          <button className="r-desktop-nav r-ghost-cta" onClick={() => setPage("demo")} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 16px", background: "transparent", border: "1.5px solid " + C.border, borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: 600, color: C.text }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.02em" }}>Get a Demo</span>
          </button>
          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{ padding: "10px 22px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Start Free Trial
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile drawer with expandable Platform group */}
      <SwipeDrawer open={open} setOpen={setOpen}>
        <div style={{ padding: "24px 24px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 32, cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
          </div>

          {/* Platform expandable group */}
          <button
            onClick={() => setMobilePlatformExpanded(!mobilePlatformExpanded)}
            style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              width: "100%", textAlign: "left", padding: "14px 0",
              background: "none", border: "none",
              borderBottom: "1px solid " + C.borderLight,
              fontSize: 17, fontWeight: platformActive ? 700 : 500,
              color: platformActive ? C.primary : C.text,
              cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Platform
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, transform: mobilePlatformExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          {mobilePlatformExpanded && (
            <div style={{ paddingLeft: 8, paddingTop: 10, paddingBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, marginBottom: 8, paddingTop: 6 }}>Features</div>
              <button onClick={() => { setPage("platform"); setOpen(false); setMobilePlatformExpanded(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 0", background: "none", border: "none", fontSize: 15, fontWeight: page === "platform" ? 700 : 500, color: page === "platform" ? C.primary : C.text, cursor: "pointer", fontFamily: "inherit" }}>
                All Features
              </button>
              {features.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setPage(f.id); setOpen(false); setMobilePlatformExpanded(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "10px 0",
                    background: "none", border: "none",
                    fontSize: 15, fontWeight: page === f.id ? 700 : 500,
                    color: page === f.id ? C.primary : C.text,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {f.label}
                </button>
              ))}
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: C.textMuted, marginTop: 14, marginBottom: 8 }}>For who</div>
              {audiences.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setPage(a.id); setOpen(false); setMobilePlatformExpanded(false); }}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "10px 0",
                    background: "none", border: "none",
                    fontSize: 15, fontWeight: page === a.id ? 700 : 500,
                    color: page === a.id ? C.primary : C.text,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {a.label}
                </button>
              ))}
              <button
                onClick={() => { setPage("enterprise"); setOpen(false); setMobilePlatformExpanded(false); }}
                style={{
                  display: "block", width: "100%", textAlign: "left", padding: "10px 0",
                  background: "none", border: "none",
                  fontSize: 15, fontWeight: page === "enterprise" ? 700 : 500,
                  color: page === "enterprise" ? C.primary : C.text,
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                Enterprise
              </button>
            </div>
          )}

          {/* Other top-level links */}
          {topLinks.map(l => (
            <button key={l.id} onClick={() => { setPage(l.id); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "left", padding: "14px 0",
              background: "none", border: "none",
              borderBottom: "1px solid " + C.borderLight,
              fontSize: 17, fontWeight: page === l.id ? 700 : 500,
              color: page === l.id ? C.primary : C.text,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {l.label}
            </button>
          ))}

          {/* Log In */}
          <button onClick={() => { setPage("login"); setOpen(false); }} style={{
            display: "block", width: "100%", textAlign: "left", padding: "14px 0",
            background: "none", border: "none",
            borderBottom: "1px solid " + C.borderLight,
            fontSize: 17, fontWeight: page === "login" ? 700 : 500,
            color: page === "login" ? C.primary : C.text,
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Log In
          </button>

          <button onClick={() => { setPage("demo"); setOpen(false); }} style={{
            width: "100%", padding: "14px 20px", background: "transparent", color: C.text,
            border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginTop: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            Get a Demo
          </button>
          <button className="cta-btn" onClick={() => { setPage("signup"); setOpen(false); }} style={{
            width: "100%", padding: "14px 20px", background: C.btn, color: "#fff",
            border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", marginTop: 10,
          }}>
            Try Free Now
          </button>
          <div style={{ marginTop: 24, fontSize: 12, color: C.textMuted }}>There's no "i" in Retayned.</div>
        </div>
      </SwipeDrawer>
    </>
  );
}

// ═══ Footer ═══
function Footer({ setPage }) {
  return (
    <footer className="v2-footer r-full-bleed r-no-pad">
      <div className="v2-footer-inner">
        <div className="v2-footer-brand">
          <div className="v2-footer-wordmark" onClick={() => setPage("home")} role="button" tabIndex={0}>Retayned.</div>
          <p className="v2-footer-tag">The CRM that prevents churn. Built for the freelancers, agencies, and teams who take client relationships personally.</p>
        </div>
        <div className="v2-footer-col">
          <h5>Product</h5>
          <a onClick={() => setPage("platform")}>Platform</a>
          <a onClick={() => setPage("feature-today")}>Today</a>
          <a onClick={() => setPage("feature-scoring")}>Retention Score</a>
          <a onClick={() => setPage("feature-health")}>Health Checks</a>
          <a onClick={() => setPage("feature-rai")}>Talk to Rai</a>
          <a onClick={() => setPage("feature-rolodex")}>Rolodex</a>
        </div>
        <div className="v2-footer-col">
          <h5>Who it's for</h5>
          <a onClick={() => setPage("freelancers")}>Freelancers</a>
          <a onClick={() => setPage("agencies")}>Agencies</a>
          <a onClick={() => setPage("enterprise")}>Enterprise</a>
          <a onClick={() => setPage("pricing")}>Pricing</a>
        </div>
        <div className="v2-footer-col">
          <h5>Company</h5>
          <a onClick={() => setPage("about")}>About</a>
          <a onClick={() => setPage("blog")}>Blog</a>
          <a onClick={() => setPage("contact")}>Contact</a>
          <a onClick={() => setPage("faq")}>FAQ</a>
        </div>
        <div className="v2-footer-col">
          <h5>Legal</h5>
          <a onClick={() => setPage("privacy")}>Privacy</a>
          <a onClick={() => setPage("terms")}>Terms</a>
        </div>
      </div>
      <div className="v2-footer-bottom">
        <div>© {new Date().getFullYear()} Maniac Digital, LLC · Retayned</div>
        <div>Washington, DC · There's no "i" in Retayned.</div>
      </div>
    </footer>
  );
}

// Inline footer for pages ending in the 4-stop gradient — renders inside the gradient wrapper
// so the gradient flows seamlessly through it (no hard cut from gradient to solid).
function InlineFooter({ setPage }) {
  return (
    <div style={{ padding: "32px 20px 24px", position: "relative", zIndex: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => setPage("home")}>
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.7)", fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.7)", marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>There's no "i" in Retayned.</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        {[["platform","Platform"],["pricing","Pricing"],["faq","FAQs"],["contact","Contact"],["privacy","Privacy"],["terms","Terms"]].map(([id, label]) => (
          <span key={id} onClick={() => setPage(id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(id)} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>{label}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.5 }}>
          <sup>1</sup> Reichheld, F. & Schefter, P. "The Economics of E-Loyalty." Harvard Business School / Bain & Company.
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>© {new Date().getFullYear()} Maniac Digital, LLC</div>
      </div>
    </div>
  );
}

// ═══ Animated counter ═══
function AnimatedStat({ value, suffix = "", prefix = "", from = 0, decimals = 0, duration = 1800 }) {
  const ref = useRef(null);
  const target = parseFloat(value);
  const initial = isNaN(target) ? value : (decimals > 0 ? from.toFixed(decimals) : String(Math.round(from)));
  const [display, setDisplay] = useState(initial);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (isNaN(target)) { setDisplay(value); return; }
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const ease = 1 - Math.pow(1 - t, 4);
      const current = from + ease * (target - from);
      setDisplay(decimals > 0 ? current.toFixed(decimals) : String(Math.round(current)));
      if (step >= steps) {
        setDisplay(decimals > 0 ? target.toFixed(decimals) : String(Math.round(target)));
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value, duration, from, decimals, target]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ═══ HERO INTERACTIVE DEMO ═══
function HeroDemo({ loaded }) {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(false);
  const demoRef = useRef(null);

  // Start animation only when the demo is scrolled into view
  useEffect(() => {
    const el = demoRef.current;
    if (!el || !loaded) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setPhase(1), 3000),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 5800),
      setTimeout(() => setPhase(6), 7000),
      setTimeout(() => setPhase(7), 7800),
      setTimeout(() => setPhase(71), 9300),
      setTimeout(() => setPhase(8), 9600),
      setTimeout(() => setPhase(9), 10400),
      setTimeout(() => setPhase(91), 11900),
      setTimeout(() => setPhase(98), 12900),
      setTimeout(() => setPhase(99), 14100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const tasks = [
    { id: "slack", text: "Review Slack for client messages", client: "All Clients" },
    { id: "rachel", text: "Call Rachel at Broadleaf", client: "Broadleaf Media" },
    { id: "oakline", text: "Review Oakline Q1 numbers", client: "Oakline Outdoors" },
    { id: "northvane", text: "Complete Northvane Health Check", client: "Northvane Studios" },
    { id: "foxglove", text: "Schedule Foxglove check-in", client: "Foxglove Partners" },
  ];

  const ROW = 44;
  const positions = {
    4:  { slack: 0, rachel: 1, oakline: 2, northvane: 3, foxglove: 4 },
    6:  { slack: 0, rachel: 1, oakline: 2, northvane: 3, foxglove: 4 },
    7:  { rachel: 0, slack: 1, oakline: 2, northvane: 3, foxglove: 4 },
    71: { rachel: 0, slack: 1, oakline: 2, northvane: 3, foxglove: 4 },
    8:  { rachel: 0, slack: 1, oakline: 2, northvane: 3, foxglove: 4 },
    9:  { rachel: 0, foxglove: 1, northvane: 2, slack: 3, oakline: 4 },
    91: { rachel: 0, foxglove: 1, northvane: 2, slack: 3, oakline: 4 },
    10: { rachel: 0, foxglove: 1, northvane: 2, slack: 3, oakline: 4 },
    98: { rachel: 0, foxglove: 1, northvane: 2, slack: 3, oakline: 4 },
  };
  const highlightId = (phase === 6 || phase === 7) ? "rachel" : (phase === 8 || phase === 9) ? "foxglove" : null;
  const currentPos = positions[phase] || positions[4];

  const cardsVisible = phase <= 3 || phase >= 98;
  const cardsReturning = phase >= 99;
  const taskVisible = phase >= 4 && phase < 98;

  return (
    <div ref={demoRef} style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s", position: "relative" }}>
      {/* Suggested by Rai label */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 14, opacity: (phase >= 3 && phase < 99) ? 0 : 1, transition: cardsReturning ? "opacity 1.45s ease" : "opacity 0.8s ease" }}>
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" stroke={C.primary} strokeWidth="1.8" fill="none" strokeLinejoin="round"/></svg>
        Suggested by Rai
      </div>

      <div style={{ position: "relative", height: 340, maxWidth: 480 }}>

        {/* ── Cards layer ── */}
        <div style={{ position: "absolute", inset: 0, opacity: cardsVisible ? 1 : 0, transition: cardsReturning ? "opacity 1.45s ease" : "opacity 0.7s ease", zIndex: cardsVisible ? 2 : 1 }}>
          {/* +12% badge */}
          <div style={{
            position: "absolute", top: -18, right: -10, zIndex: 10,
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 14px", borderRadius: 100,
            background: "rgba(255,255,255,0.9)", border: "1px solid rgba(216,223,216,0.6)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            fontSize: 12, fontWeight: 600, color: C.text,
            opacity: (phase >= 3 && phase < 99) ? 0 : (loaded ? 1 : 0),
            transition: cardsReturning ? "opacity 1.45s ease 0.5s" : "opacity 0.8s ease",
            animation: ((phase <= 3 && loaded) || cardsReturning) ? "subtleBob 4s ease-in-out infinite" : "none",
          }}>
            <span style={{ color: C.success, fontWeight: 700 }}>↑ 12%</span> retention this quarter
          </div>

          {/* Yellow (Foxglove) */}
          <div style={{
            position: "absolute", top: 0, left: 8, right: -4, zIndex: 1,
            opacity: (phase >= 3 && phase < 99) ? 0 : 1,
            transform: (phase >= 3 && phase < 99) ? "translateX(30px) scale(0.95)" : "none",
            transition: cardsReturning ? "opacity 1.45s ease" : "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid " + C.border, boxShadow: "0 2px 16px rgba(0,0,0,0.04)", background: "linear-gradient(95deg, " + C.warningBg + " 0%, #FDF8EC 30%, " + C.card + " 100%)", transform: "rotate(2.5deg)" }}>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.55, margin: 0 }}>Foxglove Partners: Response time doubled this month. Velocity is cold. Schedule a check-in before Friday.</p>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Foxglove Partners · Velocity alert</p>
              </div>
              <div className="r-alert-actions" style={{ display: "flex", borderTop: "1px solid " + C.borderLight }}><div style={{ color: C.primary }}>Add to Tasks</div></div>
            </div>
          </div>

          {/* Green (Northvane) */}
          <div style={{
            position: "absolute", top: 55, left: -6, right: 10, zIndex: 2,
            opacity: (phase >= 2 && phase < 99) ? 0 : 1,
            transform: (phase >= 2 && phase < 99) ? "translateX(30px) scale(0.95)" : "none",
            transition: cardsReturning ? "opacity 1.45s ease 0.25s" : "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid " + C.border, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", background: "linear-gradient(95deg, " + C.primarySoft + " 0%, #F0F5F1 30%, " + C.card + " 100%)", transform: "rotate(-1.5deg)" }}>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.55, margin: 0 }}>Northvane Studios: Health Check due today.</p>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Northvane Studios · Health Check</p>
              </div>
              <div className="r-alert-actions" style={{ display: "flex", borderTop: "1px solid " + C.borderLight }}><div style={{ color: C.primary }}>Add to Tasks</div></div>
            </div>
          </div>

          {/* Red (Broadleaf) */}
          <div style={{
            position: "absolute", top: 115, left: 2, right: 2, zIndex: 3,
            opacity: (phase >= 1 && phase < 99) ? 0 : 1,
            transform: (phase >= 1 && phase < 99) ? "translateX(30px) scale(0.95)" : "none",
            transition: cardsReturning ? "opacity 1.45s ease 0.4s" : "opacity 0.7s ease, transform 0.7s ease",
          }}>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid " + C.border, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", background: "linear-gradient(95deg, " + C.dangerBg + " 0%, #FDF5F3 30%, " + C.card + " 100%)", transform: "rotate(0.5deg)" }}>
              <div style={{ padding: "16px 18px" }}>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.55, margin: 0 }}>Broadleaf Media: Rachel's score dropped 9 points on last Monday's check-in and you've only emailed her since. Get a call on the books with a new deliverable ready.</p>
                <p style={{ fontSize: 12, color: C.textMuted, marginTop: 6 }}>Broadleaf Media · 2 minutes ago</p>
              </div>
              <div className="r-alert-actions" style={{ display: "flex", borderTop: "1px solid " + C.borderLight }}><div style={{ color: C.primary }}>Add to Tasks</div></div>
            </div>
          </div>
        </div>

        {/* ── Task list layer ── */}
        <div style={{ position: "absolute", inset: 0, opacity: taskVisible ? 1 : (phase >= 98 ? 0 : 0), transition: phase >= 98 ? "opacity 1.5s ease" : "opacity 1.0s ease", zIndex: taskVisible ? 3 : 0 }}>
          <div className="r-mockup-card">
            <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Your Tasks</div>
            <div style={{ position: "relative", height: ROW * 5 }}>
              {tasks.map(t => {
                const isHighlighted = t.id === highlightId;
                const pos = currentPos[t.id];
                const isFoxgloveMoving = t.id === "foxglove" && phase === 9;
                return (
                  <div key={t.id} style={{
                    position: "absolute", left: 0, right: 0, top: 0,
                    transform: `translateY(${pos * ROW}px)${isHighlighted ? " scale(1.03)" : ""}`,
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 6px", height: ROW,
                    background: isHighlighted ? "rgba(91,33,182,0.06)" : C.card,
                    borderRadius: isHighlighted ? 8 : 0,
                    boxShadow: isHighlighted ? "0 4px 20px rgba(91,33,182,0.12), 0 0 0 1px rgba(91,33,182,0.15)" : "none",
                    zIndex: isHighlighted ? 10 : 1,
                    transition: isFoxgloveMoving
                      ? "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.15s ease, background 0.15s ease"
                      : isHighlighted
                        ? "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease"
                        : "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, background 0.3s ease",
                  }}>
                    <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid " + (isHighlighted ? C.btn + "50" : C.border), flexShrink: 0, transition: "border-color 0.2s" }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: isHighlighted ? C.btn : C.text, lineHeight: 1.3, transition: "color 0.2s" }}>{t.text}</div>
                      <div style={{ fontSize: 11, color: C.textMuted }}>{t.client}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ═══ TODAY STATIC MOCKUP ═══
function TodayDemo() {
  return (
    <div className="r-mockup-card">
      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Your Tasks</div>
      {[
        { text: "Call Rachel at Broadleaf", client: "Broadleaf Media" },
        { text: "Complete Foxglove Health Check", client: "Foxglove Partners" },
        { text: "Review Slack for client messages", client: "All Clients" },
        { text: "Review Oakline Q1 numbers", client: "Oakline Outdoors" },
        { text: "Plan Northvane anniversary", client: "Northvane Studios" },
      ].map((t, ti) => (
        <div key={ti} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderTop: ti > 0 ? "1px solid " + C.borderLight : "none" }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid " + C.border, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{t.text}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{t.client}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 12, fontSize: 13, color: C.btn, fontWeight: 700 }}>Sorted. Highest-value move is first.</div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// HOMEV2 — Slite-style redesign. Activated via ?new=1 URL flag.
// Uses cream/beige dominant palette. Green reserved for small accents
// (eyebrow pills, step icons, score accents, Rai bubbles). Dark green
// crescendo in Enterprise section only. Purple for primary CTAs only.
// ═══════════════════════════════════════════════════════════════════

// Extra color tokens for v2
const V2 = {
  bgWarmer: "#EAE4D6",     // strongest beige — hero bg + final CTA bg
  bgDeviceWarm: "#F5ECD8", // device frame beige
  bgWarmerEdge: "#D9D1BE",
};

// ─── Today feed with state-driven reorder animation ───
function V2TodayFeed() {
  // 4 tasks — Rai periodically re-ranks priority order
  const initialTasks = [
    { id: "meridian", tag: "Fire", tagClass: "urgent", title: "Meridian Co. hasn't opened emails in 14 days", meta: "Revenue at risk: $96k/yr · Last touch: 18 days ago", score: 42, scoreClass: "red" },
    { id: "hollis", tag: "Deepen", tagClass: "deepen", title: "Hollis & Lee just hit one year — send handwritten note", meta: "Tenure: 12 mo · LTV: $144k · Health: 91", score: 91, scoreClass: "green" },
    { id: "otsego", tag: "Proactive", tagClass: "proactive", title: "Otsego mentioned Q3 hiring — ask about it", meta: "Touchpoint from Mar 12 · Opportunity signal", score: 64, scoreClass: "yellow" },
    { id: "baxter", tag: "Save", tagClass: "savings", title: "Baxter Firm renewal in 21 days — confirm scope", meta: "LTV: $50k · Renewal probability: 94%", score: 87, scoreClass: "green" },
  ];

  // Sequence of re-rankings (array of id orders) Rai cycles through.
  // Each order represents a different prioritization the engine surfaces.
  const orders = [
    ["meridian", "hollis", "otsego", "baxter"],
    ["meridian", "baxter", "hollis", "otsego"],
    ["hollis", "meridian", "baxter", "otsego"],
    ["meridian", "otsego", "baxter", "hollis"],
  ];

  const [orderIdx, setOrderIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setOrderIdx((i) => (i + 1) % orders.length);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  const currentOrder = orders[orderIdx];
  const ROW_HEIGHT = 76; // approx height of each task row including margin

  return (
    <div className="v2-today-feed">
      <div className="v2-feed-head">
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>Today</h3>
          <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 500, marginTop: 2 }}>4 tasks · sorted by Rai</div>
        </div>
        <div className="v2-rai-badge"><span className="v2-rai-pulse" />Rai is ranking</div>
      </div>
      <div className="v2-task-list" style={{ position: "relative", height: initialTasks.length * ROW_HEIGHT }}>
        {initialTasks.map((task) => {
          const pos = currentOrder.indexOf(task.id);
          return (
            <div
              key={task.id}
              className="v2-task"
              style={{
                position: "absolute",
                top: pos * ROW_HEIGHT,
                left: 0,
                right: 0,
                transition: "top 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            >
              <div className={"v2-tag v2-tag-" + task.tagClass}>{task.tag}</div>
              <div className="v2-task-body">
                <div className="v2-task-title">{task.title}</div>
                <div className="v2-task-meta">{task.meta}</div>
              </div>
              <div className={"v2-score-mini v2-score-" + task.scoreClass}>{task.score}</div>
            </div>
          );
        })}
      </div>
      <div className="v2-rai-whisper">
        <div className="v2-rai-avatar">R</div>
        <div className="v2-rai-text"><strong style={{ color: C.text }}>Rai:</strong> Meridian just moved to the top — their score dropped from 68 to 42 in three weeks. Want the outreach script?</div>
      </div>
    </div>
  );
}

// ─── JS-smooth-scroll wordmark tapestry ───
function V2ScrollBand({ items, direction = "left", speed = 35 }) {
  // items: array of { className, label, colorClass }
  // direction: "left" means content moves left (so track translates to negative X)
  // speed: pixels per second
  const trackRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for layout, then capture width of one copy (half of total since we duplicate)
    const measure = () => track.scrollWidth / 2;
    let halfWidth = measure();

    const tick = (ts) => {
      if (lastTimeRef.current == null) lastTimeRef.current = ts;
      const dt = (ts - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = ts;
      const delta = speed * dt * (direction === "left" ? -1 : 1);
      offsetRef.current += delta;
      // Wrap — keep offset in [-halfWidth, 0] for left, or [0, halfWidth] for right
      if (direction === "left") {
        if (offsetRef.current <= -halfWidth) offsetRef.current += halfWidth;
      } else {
        if (offsetRef.current >= 0) offsetRef.current -= halfWidth;
      }
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    // Initial offset for right direction — start at -halfWidth so content is "ahead"
    if (direction === "right") {
      offsetRef.current = -halfWidth;
      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
    }

    // Start animation
    rafRef.current = requestAnimationFrame(tick);

    // Re-measure on window resize
    const onResize = () => {
      halfWidth = measure();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [direction, speed]);

  return (
    <div className="v2-scroll-band">
      <div className="v2-scroll-track" ref={trackRef}>
        {items.map((it, i) => (
          <span key={"a" + i} className={it.className}>{it.label}</span>
        ))}
        {items.map((it, i) => (
          <span key={"b" + i} className={it.className}>{it.label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Main HomeV2 component ───
function HomeV2({ setPage }) {
  const [audienceTab, setAudienceTab] = useState("freelancers");
  const [activeTab, setActiveTab] = useState(1);
  const [expandedText, setExpandedText] = useState(false);

  const homeTabs = [
    { id: "today", label: "Today", icon: "◉", headline: "One page. Every priority.", sub: "Your Today tab knows which clients need you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value. Green clients surface first. At-risk clients with high revenue jump the line." },
    { id: "scoring", label: "Retention Score", icon: "◎", headline: "A number that means something.", sub: "12 dimensions. 20 combination signals. Health check modifiers. Every client gets a Retention Score from 1–99 that tells you exactly where the relationship stands — not where you hope it is." },
    { id: "health", label: "Health Checks", icon: "♡", headline: "Five questions. Two minutes. The truth.", sub: "Regular check-ins that detect drift before it becomes damage. Your answers blend directly into the Retention Score — bad news moves the number immediately. No lengthy forms. No busywork. Just the signal." },
    { id: "rai", label: "Talk to Rai", icon: "✦", headline: "She writes the words you need when it matters most.", sub: "Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script." },
    { id: "rolodex", label: "Rolodex", icon: "⟐", headline: "Your pipeline is forward-looking.", sub: "Former clients aren't dead relationships — they're future revenue. The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities." },
    { id: "referrals", label: "Referrals", icon: "⟡", headline: "Your best clients send you their friends.", sub: "Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do." },
  ];
  const ht = homeTabs[activeTab];

  const dimensions = [
    { className: "v2-dim v2-dim-serif-italic", label: "Grace" },
    { className: "v2-dim v2-dim-heavy-caps", label: "TRUST" },
    { className: "v2-dim v2-dim-spaced-lower", label: "communication" },
    { className: "v2-dim v2-dim-serif", label: "Loyalty" },
    { className: "v2-dim v2-dim-small-caps", label: "BUDGET RISK" },
    { className: "v2-dim v2-dim-serif-italic-lg", label: "Depth" },
    { className: "v2-dim v2-dim-small-caps", label: "STRESS" },
    { className: "v2-dim v2-dim-serif-italic", label: "Expectations" },
    { className: "v2-dim v2-dim-spaced-lower", label: "FUNGIBILITY" },
    { className: "v2-dim v2-dim-serif-italic-lg", label: "tone" },
    { className: "v2-dim v2-dim-heavy-caps", label: "AUTHORITY" },
    { className: "v2-dim v2-dim-small-caps", label: "REPORTING" },
  ];

  const combinations = [
    { className: "v2-wm v2-wm-pos v2-wm-bulletproof", label: "Bulletproof" },
    { className: "v2-wm v2-wm-neg v2-wm-icewall", label: "Ice Wall" },
    { className: "v2-wm v2-wm-pos v2-wm-lockedvault", label: "LOCKED VAULT" },
    { className: "v2-wm v2-wm-neg v2-wm-ontheclock", label: "On the Clock" },
    { className: "v2-wm v2-wm-pos v2-wm-cornerstone", label: "Cornerstone" },
    { className: "v2-wm v2-wm-neg v2-wm-silentexit", label: "Silent Exit" },
    { className: "v2-wm v2-wm-pos v2-wm-decisionexpress", label: "DECISION EXPRESS" },
    { className: "v2-wm v2-wm-neg v2-wm-noroom", label: "NO ROOM TO OPERATE" },
    { className: "v2-wm v2-wm-pos v2-wm-truepartner", label: "True Partner" },
    { className: "v2-wm v2-wm-neg v2-wm-tickingbomb", label: "TICKING TIME BOMB" },
    { className: "v2-wm v2-wm-pos v2-wm-smoothop", label: "Smooth Operator" },
    { className: "v2-wm v2-wm-neg v2-wm-onefoot", label: "One Foot Out" },
    { className: "v2-wm v2-wm-pos v2-wm-allinvestor", label: "All-in Investor" },
    { className: "v2-wm v2-wm-neg v2-wm-powderkeg", label: "POWDER KEG" },
    { className: "v2-wm v2-wm-pos v2-wm-openbook", label: "Open Book" },
    { className: "v2-wm v2-wm-neg v2-wm-nickeldime", label: "Nickel and Dime" },
    { className: "v2-wm v2-wm-pos v2-wm-resilient", label: "RESILIENT UNDER FIRE" },
    { className: "v2-wm v2-wm-neg v2-wm-noanchor", label: "No Anchor" },
    { className: "v2-wm v2-wm-pos v2-wm-lowmaint", label: "Low Maintenance Loyalty" },
    { className: "v2-wm v2-wm-neg v2-wm-bottleneck", label: "BOTTLENECK DOOM" },
  ];

  const audiencePanels = {
    freelancers: {
      h: "The CRM that catches what you miss.",
      p: "You're a team of one. You can't be on every Slack thread, every email, every hint of drift. Retayned watches the whole book while you focus on the work.",
      cta: "See the platform",
      ctaTarget: "freelancers",
    },
    agencies: {
      h: "Your team's memory, on one system.",
      p: "When an account manager leaves, they take 40 client relationships with them. Retayned holds the institutional knowledge — so your team doesn't have to.",
      cta: "See for agencies",
      ctaTarget: "agencies",
    },
    enterprise: {
      h: "Two surfaces, one brain.",
      p: "Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface.",
      cta: "See Enterprise",
      ctaTarget: "enterprise",
    },
  };
  const panel = audiencePanels[audienceTab];

  return (
    <div className="v2-root">
      {/* Feature tabs CSS (preserved from old Home so tabs render correctly in HomeV2) */}
      <style>{`
        .r-hero-cta {
          padding: 15px 32px; background: ${C.btn}; color: #fff;
          border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .r-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,33,182,0.25); }
        .r-hero-cta:active { transform: translateY(0); }
        .r-ghost-cta {
          padding: 15px 32px; background: transparent; color: ${C.btn};
          border: 2px solid ${C.btn}; border-radius: 12px; font-size: 15px;
          font-weight: 700; cursor: pointer; font-family: inherit;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .r-ghost-cta:hover { transform: translateY(-2px); background: ${C.btnSoft}; box-shadow: 0 8px 24px rgba(91,33,182,0.12); }
        .r-ghost-cta:active { transform: translateY(0); }
        .r-tab-pill {
          padding: 10px 18px; border-radius: 10px; border: none; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 500;
          transition: all 0.25s ease; white-space: nowrap; flex: 0 0 auto;
          position: relative;
        }
        .r-tab-pill:hover { background: rgba(255,255,255,0.6); }
        .r-tab-pill[data-active="true"] {
          background: ${C.card}; color: ${C.primary}; font-weight: 700;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }
        .r-mockup-card {
          background: ${C.card}; border-radius: 18px; border: 1px solid ${C.border};
          padding: 22px; box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .r-mockup-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.09), 0 4px 12px rgba(0,0,0,0.04); }
      `}</style>

      {/* ══════ HERO ══════ */}
      <section className="v2-hero r-full-bleed r-no-pad">
        <div className="v2-hero-inner">
          <div className="v2-trust-pill">
            <span className="v2-trust-dot" />
            For freelancers, agencies, account reps, and mobsters
          </div>
          <h1 className="v2-hero-h1">
            The CRM that{" "}
            <span className="v2-strike-wrap">
              <span className="v2-strike">predicts</span>
              <span className="v2-caveat">prevents</span>
            </span>{" "}churn.
          </h1>
          <p className="v2-hero-sub">Stop losing clients you should have kept.</p>
          <p className="v2-hero-desc">Traditional CRMs track deals. Retayned tracks the health of relationships — giving you client-specific solutions to keep and grow the business you've earned.</p>
          <div className="v2-hero-cta-row">
            <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
            <button className="v2-btn-secondary-lg" onClick={() => setPage("platform")}>See the platform</button>
          </div>
          <p className="v2-hero-fine">14-day free trial. Cancel anytime.</p>

          <div className="v2-hero-device">
            <div className="v2-hero-device-inner">
              <div className="v2-device-topbar">
                <div className="v2-device-dots"><span /><span /><span /></div>
                <div className="v2-device-url">app.retayned.com / today</div>
              </div>
              <V2TodayFeed />
            </div>
          </div>
        </div>
      </section>

      {/* curve: hero (beige) → stats (cream) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#F2EEE8" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,20 Q 720,140 0,30 Z" fill={C.bg} /></svg>
      </div>

      {/* ══════ MEET RAI ══════ */}
      <section className="v2-section-rai r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head">
            <div className="v2-eyebrow">How it works</div>
            <h2 className="v2-section-h2">Meet <span style={{ color: C.btn }}>Rai</span>. <span className="v2-muted">She pays attention to every client, every day.</span></h2>
            <p className="v2-section-sub">When something shifts, she catches it — and tells you what to do about it.</p>
          </div>
          <div className="v2-rai-steps">
            {[
              {
                num: "01",
                h: <>She sees it.</>,
                p: "Cross-referencing tasks, health checks, score trends, 20+ combination signals — continuously, across your entire book.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2814%2022%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%2220%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2214%22%20cy%3D%2214%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2220%22%20cy%3D%2218%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2226%22%20cy%3D%2210%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2230%22%20cy%3D%228%22%20r%3D%221.4%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C22%2012%2C18%2020%2C14%2028%2C10%2032%2C6%22%20fill%3D%22none%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2856%2014%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%0A%20%20%20%20%3Cpath%20d%3D%22M4%206%20Q4%204%206%204%20L18%204%20Q20%204%2020%206%20L20%2012%20Q20%2014%2018%2014%20L10%2014%20L6%2017%20L7%2014%20Q4%2014%204%2012%20Z%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%228%22%20x2%3D%2217%22%20y2%3D%228%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%2211%22%20x2%3D%2214%22%20y2%3D%2211%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%0A%20%20%20%20%3Cpath%20d%3D%22M16%2017%20Q16%2015%2018%2015%20L30%2015%20Q32%2015%2032%2017%20L32%2023%20Q32%2025%2030%2025%20L22%2025%20L19%2028%20L20%2025%20Q16%2025%2016%2023%20Z%22%20fill%3D%22%232F2F31%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%2219%22%20y1%3D%2219%22%20x2%3D%2229%22%20y2%3D%2219%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2219%22%20y1%3D%2222%22%20x2%3D%2227%22%20y2%3D%2222%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2816%2058%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2222%22%20x2%3D%226%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2222%22%20x2%3D%2212%22%20y2%3D%2210%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2222%22%20x2%3D%2218%22%20y2%3D%2214%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2224%22%20y1%3D%2222%22%20x2%3D%2224%22%20y2%3D%228%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2230%22%20y1%3D%2222%22%20x2%3D%2230%22%20y2%3D%2212%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28264%2010%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C16%2010%2C18%2016%2C12%2022%2C14%2028%2C6%2032%2C10%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28308%2024%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpath%20d%3D%22M4%205%20Q4%203%206%203%20L20%203%20Q22%203%2022%205%20L22%2011%20Q22%2013%2020%2013%20L10%2013%20L6%2016%20L7%2013%20Q4%2013%204%2011%20Z%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%227%22%20x2%3D%2219%22%20y2%3D%227%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%227%22%20y1%3D%2210%22%20x2%3D%2216%22%20y2%3D%2210%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cpath%20d%3D%22M14%2016%20Q14%2014%2016%2014%20L30%2014%20Q32%2014%2032%2016%20L32%2022%20Q32%2024%2030%2024%20L20%2024%20L17%2027%20L18%2024%20Q14%2024%2014%2022%20Z%22%20fill%3D%22%232F2F31%22%3E%3C/path%3E%0A%20%20%20%20%3Cline%20x1%3D%2217%22%20y1%3D%2218%22%20x2%3D%2229%22%20y2%3D%2218%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2217%22%20y1%3D%2221%22%20x2%3D%2225%22%20y2%3D%2221%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%220.9%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28306%2062%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C22%2010%2C18%2016%2C14%2022%2C16%2028%2C10%2032%2C6%22%20fill%3D%22none%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%226%22%20r%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2812%20212%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C12%2010%2C10%2016%2C16%2022%2C14%2028%2C22%2032%2C20%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2814%20250%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%2210%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2214%22%20cy%3D%2218%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2214%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2220%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2232%22%20cy%3D%228%22%20r%3D%221.3%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28304%20222%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2222%22%20x2%3D%226%22%20y2%3D%2210%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2222%22%20x2%3D%2212%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2222%22%20x2%3D%2218%22%20y2%3D%228%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2224%22%20y1%3D%2222%22%20x2%3D%2224%22%20y2%3D%2214%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2230%22%20y1%3D%2222%22%20x2%3D%2230%22%20y2%3D%226%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28308%20260%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2228%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cpolyline%20points%3D%224%2C20%2010%2C14%2016%2C8%2022%2C12%2028%2C10%2032%2C4%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20fill%3D%22%232F2F31%22%20opacity%3D%220.18%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2280%22%20cy%3D%22118%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2296%22%20cy%3D%2296%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22104%22%20cy%3D%22152%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2272%22%20cy%3D%22172%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22266%22%20cy%3D%22108%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22284%22%20cy%3D%22146%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22272%22%20cy%3D%22186%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22252%22%20cy%3D%22130%22%20r%3D%221.4%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%20opacity%3D%220.4%22%20stroke-dasharray%3D%222%203%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M50%2034%20L146%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M56%2072%20L146%20128%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M52%2086%20L146%20160%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M300%2030%20L214%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M324%2090%20L214%20128%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M48%20232%20L146%20180%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M48%20264%20L146%20190%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M322%20240%20L214%20180%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M326%20280%20L214%20184%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28106%20102%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%223%22%20y%3D%225%22%20width%3D%22150%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.10%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22150%22%20height%3D%22110%22%20rx%3D%2210%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.2%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2214%22%20x2%3D%2270%22%20y2%3D%2214%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2221%22%20x2%3D%2252%22%20y2%3D%2221%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.3%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.7%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22104%22%20y%3D%228%22%20width%3D%2234%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22112%22%20cy%3D%2215%22%20r%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%22118%22%20y1%3D%2215%22%20x2%3D%22132%22%20y2%3D%2215%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%0A%20%20%20%20%3Crect%20x%3D%2212%22%20y%3D%2232%22%20width%3D%22126%22%20height%3D%2264%22%20rx%3D%224%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.8%22%20opacity%3D%220.25%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2248%22%20x2%3D%22138%22%20y2%3D%2248%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2264%22%20x2%3D%22138%22%20y2%3D%2264%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%2280%22%20x2%3D%22138%22%20y2%3D%2280%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2240%22%20y1%3D%2232%22%20x2%3D%2240%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2272%22%20y1%3D%2232%22%20x2%3D%2272%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22104%22%20y1%3D%2232%22%20x2%3D%22104%22%20y2%3D%2296%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cg%20fill%3D%22%232F2F31%22%20opacity%3D%220.45%22%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2282%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2274%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2238%22%20cy%3D%2278%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2246%22%20cy%3D%2270%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2254%22%20cy%3D%2266%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2262%22%20cy%3D%2272%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2270%22%20cy%3D%2260%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2278%22%20cy%3D%2258%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2286%22%20cy%3D%2252%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2294%22%20cy%3D%2254%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22102%22%20cy%3D%2246%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22110%22%20cy%3D%2248%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22118%22%20cy%3D%2242%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22126%22%20cy%3D%2238%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2234%22%20cy%3D%2288%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2258%22%20cy%3D%2280%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%2282%22%20cy%3D%2266%22%20r%3D%221.3%22%3E%3C/circle%3E%3Ccircle%20cx%3D%22106%22%20cy%3D%2258%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%22122%22%20cy%3D%2252%22%20r%3D%221.3%22%3E%3C/circle%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cpolyline%20points%3D%2218%2C84%2034%2C78%2052%2C70%2070%2C62%2088%2C54%20106%2C46%20124%2C40%20134%2C36%22%20fill%3D%22none%22%20stroke%3D%22%23558B68%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/polyline%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22124%22%20cy%3D%2240%22%20r%3D%224.8%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%22124%22%20y1%3D%2240%22%20x2%3D%22124%22%20y2%3D%2228%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Ccircle%20cx%3D%22124%22%20cy%3D%2226%22%20r%3D%222.2%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221%22%3E%3C/circle%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%22102%22%20x2%3D%2290%22%20y2%3D%22102%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.3%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2296%22%20y1%3D%22102%22%20x2%3D%22138%22%20y2%3D%22102%22%20stroke%3D%22%23558B68%22%20stroke-width%3D%223%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28250%20160%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2214%22%20fill%3D%22%23558B68%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Cpath%20d%3D%22M-5%20-6%20L5%20-6%20L-5%200%20L5%206%20L-5%206%22%20fill%3D%22none%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
              {
                num: "02",
                h: <>She calls it out.</>,
                p: "Every morning, before your first coffee. You don't go looking for the problem. The problem finds you without any trouble.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M150%2058%20Q144%2044%20154%2034%20Q162%2024%20154%2012%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M178%2054%20Q172%2038%20182%2028%20Q188%2020%20182%208%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M204%2060%20Q198%2046%20208%2036%20Q216%2026%20208%2014%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28110%2070%29%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20d%3D%22M130%2050%20Q170%2050%20170%2090%20Q170%20130%20130%20130%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20d%3D%22M130%2062%20Q158%2062%20158%2090%20Q158%20118%20130%20118%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%20d%3D%22M6%2044%20Q4%2038%2012%2038%20L134%2038%20Q142%2038%20140%2044%20L132%20174%20Q130%20184%20120%20184%20L26%20184%20Q16%20184%2014%20174%20Z%22%3E%3C/path%3E%0A%20%20%20%20%3Cellipse%20cx%3D%2273%22%20cy%3D%2245%22%20rx%3D%2262%22%20ry%3D%229%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/ellipse%3E%0A%20%20%20%20%3Cellipse%20cx%3D%2273%22%20cy%3D%2245%22%20rx%3D%2254%22%20ry%3D%226%22%20fill%3D%22%233F434B%22%20opacity%3D%220.9%22%3E%3C/ellipse%3E%0A%20%20%20%20%3Cpath%20d%3D%22M40%2042%20Q52%2038%2070%2039%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.8%22%3E%3C/path%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%220.9%22%20opacity%3D%220.35%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22118%22%20y1%3D%2270%22%20x2%3D%22122%22%20y2%3D%22164%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22124%22%20y1%3D%2270%22%20x2%3D%22127%22%20y2%3D%22160%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22112%22%20y1%3D%2272%22%20x2%3D%22115%22%20y2%3D%22166%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%28220%20130%29%20rotate%2810%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2292%22%20height%3D%22140%22%20rx%3D%2212%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%226%22%20y%3D%2214%22%20width%3D%2280%22%20height%3D%22118%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%2236%22%20y%3D%226%22%20width%3D%2220%22%20height%3D%223%22%20rx%3D%221.5%22%20fill%3D%22%232F2F31%22%3E%3C/rect%3E%0A%0A%20%20%20%20%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%2022%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23558B68%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.8%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%2210%22%20cy%3D%2210%22%20r%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2220%22%20y1%3D%228%22%20x2%3D%2258%22%20y2%3D%228%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2220%22%20y1%3D%2214%22%20x2%3D%2248%22%20y2%3D%2214%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.85%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2226%22%20x2%3D%2266%22%20y2%3D%2226%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2232%22%20x2%3D%2258%22%20y2%3D%2232%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%226%22%20y1%3D%2238%22%20x2%3D%2242%22%20y2%3D%2238%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%2074%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2222%22%20rx%3D%225%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%229%22%20cy%3D%2211%22%20r%3D%223%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%229%22%20x2%3D%2258%22%20y2%3D%229%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2215%22%20x2%3D%2244%22%20y2%3D%2215%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%20%20%3Cg%20transform%3D%22translate%2810%20102%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2272%22%20height%3D%2222%22%20rx%3D%225%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Ccircle%20cx%3D%229%22%20cy%3D%2211%22%20r%3D%223%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%229%22%20x2%3D%2254%22%20y2%3D%229%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2218%22%20y1%3D%2215%22%20x2%3D%2240%22%20y2%3D%2215%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2292%22%20y1%3D%2230%22%20x2%3D%2292%22%20y2%3D%2248%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%20fill%3D%22none%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M232%20108%20L228%20100%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M246%20102%20L244%2092%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M260%20100%20L262%2090%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M274%20104%20L280%2096%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20transform%3D%22translate%28300%20100%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2210%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%22-4%22%20x2%3D%220%22%20y2%3D%222%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%226%22%20r%3D%221.4%22%20fill%3D%22%232F2F31%22%3E%3C/circle%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
              {
                num: "03",
                h: <>She ranks it.</>,
                p: "Using a proprietary scoring engine, Rai weighs all of the day's tasks by retention impact. Your highest-value move is next up.",
                bg: `url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20360%20300%22%3E%0A%20%20%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2850%20220%29%20rotate%28-3%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E4%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22160%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22120%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2212%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.6%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2856%20170%29%20rotate%28-1%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E3%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22168%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22132%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2222%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.6%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2852%20120%29%20rotate%28-2%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22240%22%20height%3D%2244%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2222%22%20cy%3D%2222%22%20r%3D%2212%22%20fill%3D%22%23FAF0E4%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2222%22%20y%3D%2227%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2215%22%20font-weight%3D%22600%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E1%3C/text%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2216%22%20x2%3D%22172%22%20y2%3D%2216%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2244%22%20y1%3D%2226%22%20x2%3D%22140%22%20y2%3D%2226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2244%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22180%22%20y%3D%2216%22%20width%3D%2232%22%20height%3D%226%22%20rx%3D%223%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.65%22%3E%3C/rect%3E%0A%20%20%20%20%3Cline%20x1%3D%22180%22%20y1%3D%2230%22%20x2%3D%22212%22%20y2%3D%2230%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%3C/g%3E%0A%0A%20%20%0A%20%20%3Cg%20transform%3D%22translate%2848%2038%29%20rotate%28-2%29%22%3E%0A%20%20%20%20%3Crect%20x%3D%223%22%20y%3D%225%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22%232F2F31%22%20opacity%3D%220.12%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22%23558B68%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22264%22%20height%3D%2258%22%20rx%3D%228%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222.4%22%20stroke-linejoin%3D%22round%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2229%22%20r%3D%2216%22%20fill%3D%22%23FCFCFE%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2228%22%20cy%3D%2229%22%20r%3D%2216%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%222%22%3E%3C/circle%3E%0A%20%20%20%20%3Ctext%20x%3D%2228%22%20y%3D%2235%22%20font-family%3D%22Georgia%2C%20serif%22%20font-size%3D%2220%22%20font-weight%3D%22700%22%20fill%3D%22%232F2F31%22%20text-anchor%3D%22middle%22%3E2%3C/text%3E%0A%0A%20%20%20%20%3Cline%20x1%3D%2254%22%20y1%3D%2220%22%20x2%3D%22176%22%20y2%3D%2220%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222.6%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3Cline%20x1%3D%2254%22%20y1%3D%2232%22%20x2%3D%22148%22%20y2%3D%2232%22%20stroke%3D%22%23FCFCFE%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20opacity%3D%220.9%22%3E%3C/line%3E%0A%0A%20%20%20%20%3Crect%20x%3D%22190%22%20y%3D%2220%22%20width%3D%2260%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22%23FCFCFE%22%20opacity%3D%220.55%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22190%22%20y%3D%2220%22%20width%3D%2260%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.2%22%3E%3C/rect%3E%0A%20%20%20%20%3Crect%20x%3D%22192%22%20y%3D%2222%22%20width%3D%2250%22%20height%3D%224%22%20rx%3D%222%22%20fill%3D%22%23FCFCFE%22%3E%3C/rect%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%28190%2036%29%22%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2260%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22%23FCFCFE%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2260%22%20height%3D%2212%22%20rx%3D%226%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/rect%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228%22%20y1%3D%226%22%20x2%3D%2252%22%20y2%3D%226%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%0A%20%20%20%20%3Cg%20transform%3D%22translate%28252%20-6%29%20rotate%2815%29%22%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M0%20-8%20L2.4%20-2.4%20L8%20-2%20L3.6%202%20L5%208%20L0%204.6%20L-5%208%20L-3.6%202%20L-8%20-2%20L-2.4%20-2.4%20Z%22%20fill%3D%22%23FCFCFE%22%3E%3C/path%3E%0A%20%20%20%20%20%20%3Cpath%20d%3D%22M0%20-8%20L2.4%20-2.4%20L8%20-2%20L3.6%202%20L5%208%20L0%204.6%20L-5%208%20L-3.6%202%20L-8%20-2%20L-2.4%20-2.4%20Z%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linejoin%3D%22round%22%3E%3C/path%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.6%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20fill%3D%22none%22%20opacity%3D%220.9%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M320%20180%20Q332%20140%20320%2096%22%3E%3C/path%3E%0A%20%20%20%20%3Cpath%20d%3D%22M316%20100%20L320%2092%20L326%2098%22%3E%3C/path%3E%0A%20%20%3C/g%3E%0A%0A%20%20%3Cg%20transform%3D%22translate%28322%20226%29%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%2212%22%20fill%3D%22%23FCFCFE%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Ccircle%20cx%3D%220%22%20cy%3D%220%22%20r%3D%224%22%20fill%3D%22none%22%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%3E%3C/circle%3E%0A%20%20%20%20%3Cg%20stroke%3D%22%232F2F31%22%20stroke-width%3D%221.4%22%20stroke-linecap%3D%22round%22%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%22-12%22%20x2%3D%220%22%20y2%3D%22-16%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%220%22%20y1%3D%2212%22%20x2%3D%220%22%20y2%3D%2216%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-12%22%20y1%3D%220%22%20x2%3D%22-16%22%20y2%3D%220%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%2212%22%20y1%3D%220%22%20x2%3D%2216%22%20y2%3D%220%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-8.5%22%20y1%3D%22-8.5%22%20x2%3D%22-11.3%22%20y2%3D%22-11.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228.5%22%20y1%3D%228.5%22%20x2%3D%2211.3%22%20y2%3D%2211.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%22-8.5%22%20y1%3D%228.5%22%20x2%3D%22-11.3%22%20y2%3D%2211.3%22%3E%3C/line%3E%0A%20%20%20%20%20%20%3Cline%20x1%3D%228.5%22%20y1%3D%22-8.5%22%20x2%3D%2211.3%22%20y2%3D%22-11.3%22%3E%3C/line%3E%0A%20%20%20%20%3C/g%3E%0A%20%20%3C/g%3E%0A%3C/svg%3E")`,
              },
            ].map((s, i) => (
              <div key={i} className="v2-rai-step">
                <div className="v2-rai-step-illustration" style={{ backgroundImage: s.bg }} />
                <div className="v2-rai-step-content">
                  <div className="v2-rai-step-num">Step · {s.num}</div>
                  <h3 className="v2-rai-step-h">{s.h}</h3>
                  <p className="v2-rai-step-p">{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* curve: rai (cream) → platform (warm) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.bg }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 C 1080,-20 360,140 0,25 Z" fill="#EAE4D6" /></svg>
      </div>

      {/* ══════ PLATFORM ══════ */}
      <section className="v2-section-platform r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-platform-grid">
            <div>
              <div className="v2-eyebrow">The platform</div>
              <h2 className="v2-section-h2">CRMs track deals. <span className="v2-muted">Retayned tracks relationships.</span></h2>
              <p className="v2-section-sub">Your pipeline is forward-looking. Your clients aren't in it. They're the business you've already earned — and most CRMs treat them like they're already safe.</p>
              <div className="v2-bullets">
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>12-dimension retention scoring</strong> that measures relationship health, not transaction volume.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Health checks that blend into the score</strong> — five questions, two minutes, and the truth moves the number immediately.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Rai writes the words you need</strong> when it matters most — calibrated to your specific relationships.</div></div>
                <div className="v2-bullet"><div className="v2-check">✓</div><div><strong>Your Rolodex is future revenue</strong> — former clients become re-engagement opportunities, not dead weight.</div></div>
              </div>
            </div>
            <div className="v2-platform-portfolio">
              {/* Header */}
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 3, letterSpacing: "0.03em" }}>Your portfolio</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>Clients</span>
                </div>
                <div style={{ fontSize: 11, color: C.textMuted }}>
                  <span style={{ color: C.text, fontWeight: 600 }}>14 active</span> · <span style={{ color: C.primary, fontWeight: 700 }}>$58.2k</span>/mo · <span style={{ color: C.primary, fontWeight: 700 }}>71</span> avg
                </div>
              </div>

              {/* Two-column layout: left sidebar + main table */}
              <div className="v2-platform-portfolio-grid">

                {/* Left sidebar — portfolio summary + recent movement */}
                <div className="v2-port-sidebar">
                  <div className="v2-port-card">
                    <div className="v2-port-card-label">PORTFOLIO</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: "50%",
                        border: "3px solid " + C.primary,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 900, color: C.primary,
                      }}>71</div>
                      <div style={{ fontSize: 11, lineHeight: 1.55, flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>Clients</span><span style={{ fontWeight: 700 }}>14</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>MRR</span><span style={{ fontWeight: 700 }}>$58.2k</span></div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.textMuted }}>Avg</span><span style={{ fontWeight: 700 }}>71</span></div>
                      </div>
                    </div>
                    <div style={{ display: "flex", height: 3, borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                      <div style={{ flex: 5, background: C.success }} />
                      <div style={{ flex: 4, background: C.primaryLight }} />
                      <div style={{ flex: 4, background: "#B88B15" }} />
                      <div style={{ flex: 1, background: C.danger }} />
                    </div>
                    <div style={{ fontSize: 10.5, lineHeight: 1.7 }}>
                      <div><span style={{ color: C.success, marginRight: 4 }}>●</span><strong>5</strong> <span style={{ color: C.textMuted }}>Thriving</span></div>
                      <div><span style={{ color: C.primaryLight, marginRight: 4 }}>●</span><strong>4</strong> <span style={{ color: C.textMuted }}>Healthy</span></div>
                      <div><span style={{ color: "#B88B15", marginRight: 4 }}>●</span><strong>4</strong> <span style={{ color: C.textMuted }}>Watch</span></div>
                      <div><span style={{ color: C.danger, marginRight: 4 }}>●</span><strong>1</strong> <span style={{ color: C.textMuted }}>At risk</span></div>
                    </div>
                  </div>

                  <div className="v2-port-card">
                    <div className="v2-port-card-label" style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>RECENT MOVEMENT</span><span style={{ color: C.textMuted }}>7d</span>
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.success, marginBottom: 6, letterSpacing: "0.06em" }}>CLIMBING</div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: C.primaryLight }}>NR</span><span style={{ flex: 1, fontSize: 11 }}>Northvane Retail</span><span style={{ fontSize: 10, color: C.success, fontWeight: 700 }}>+5</span></div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: C.primary }}>HP</span><span style={{ flex: 1, fontSize: 11 }}>Harbor Pines</span><span style={{ fontSize: 10, color: C.success, fontWeight: 700 }}>+3</span></div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.danger, marginTop: 10, marginBottom: 6, letterSpacing: "0.06em" }}>SLIPPING</div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: "#B88B15" }}>EC</span><span style={{ flex: 1, fontSize: 11 }}>Ellis & Co.</span><span style={{ fontSize: 10, color: C.danger, fontWeight: 700 }}>−4</span></div>
                    <div className="v2-port-movement-item"><span className="v2-port-avatar" style={{ background: "#92A596" }}>BQ</span><span style={{ flex: 1, fontSize: 11 }}>Birchwood Quarry</span><span style={{ fontSize: 10, color: C.danger, fontWeight: 700 }}>−3</span></div>
                  </div>
                </div>

                {/* Main table */}
                <div className="v2-port-table-wrap">
                  <div className="v2-port-controls">
                    <div style={{ display: "flex", gap: 4, fontSize: 10 }}>
                      <span style={{ color: C.textMuted }}>SORT</span>
                      <span className="v2-port-pill v2-port-pill-active">Priority</span>
                      <span className="v2-port-pill">Revenue</span>
                      <span className="v2-port-pill">Trend</span>
                      <span className="v2-port-pill">Renewal</span>
                    </div>
                  </div>
                  <div style={{ padding: "8px 14px", fontSize: 10, color: C.textMuted, borderBottom: "1px solid " + C.borderLight, display: "flex", justifyContent: "space-between" }}>
                    <span>14 clients</span><span>Sort: <strong style={{ color: C.text }}>Priority</strong></span>
                  </div>

                  {/* Column headers */}
                  <div className="v2-port-row v2-port-row-header">
                    <div style={{ flex: "2 1 0", minWidth: 0 }}>CLIENT</div>
                    <div className="v2-port-col-num">HEALTH</div>
                    <div className="v2-port-col-num">REVENUE</div>
                    <div className="v2-port-col-num">12-WK</div>
                    <div className="v2-port-col-num">CADENCE</div>
                    <div className="v2-port-col-num">RENEWS</div>
                  </div>

                  {/* Client rows */}
                  {[
                    { i: "HM", name: "Harlow Media", industry: "Financial Services", score: 88, scoreColor: C.success, delta: "−3", revenue: "$5.8k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "12d silent", cadenceColor: "o", renews: "4mo" },
                    { i: "VC", name: "Vantage Collective", industry: "Ecommerce", score: 87, scoreColor: C.success, delta: "−2", revenue: "$9.2k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "18d cadence", cadenceColor: "●", renews: "5mo" },
                    { i: "OR", name: "Orchard Ridge", industry: "Ecommerce", score: 79, scoreColor: C.primaryLight, delta: "−2", revenue: "$8.7k", trend: "down", trendPct: "−7%", trendColor: C.danger, cadence: "10d cadence", cadenceColor: "●", renews: "6mo" },
                    { i: "NR", name: "Northvane Retail", industry: "Ecommerce", score: 92, scoreColor: C.success, delta: "+2", revenue: "$4.3k", trend: "up", trendPct: "+8%", trendColor: C.success, cadence: "10d cadence", cadenceColor: "●", renews: "1mo" },
                    { i: "LG", name: "Lantern Group", industry: "Legal Services", score: 72, scoreColor: "#B88B15", delta: "+4", revenue: "$5.5k", trend: "up", trendPct: "+10%", trendColor: C.success, cadence: "19d cadence", cadenceColor: "●", renews: "2mo" },
                    { i: "EC", name: "Ellis & Co.", industry: "Ecommerce", score: 78, scoreColor: C.primaryLight, delta: "−4", revenue: "$4.1k", trend: "down", trendPct: "−6%", trendColor: C.danger, cadence: "On rhythm", cadenceColor: "●●", renews: "3mo" },
                    { i: "SG", name: "Sidegate", industry: "Ecommerce", score: 84, scoreColor: C.success, delta: "+3", revenue: "$1.2k", trend: "up", trendPct: "+9%", trendColor: C.success, cadence: "17d cadence", cadenceColor: "●", renews: "5mo" },
                  ].map((r, idx) => (
                    <div key={idx} className="v2-port-row">
                      <div style={{ flex: "2 1 0", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                        <span className="v2-port-avatar" style={{ background: r.scoreColor }}>{r.i}</span>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                          <div style={{ fontSize: 10, color: C.textMuted }}>{r.industry}</div>
                        </div>
                      </div>
                      <div className="v2-port-col-num">
                        <span style={{ fontSize: 13, fontWeight: 900, color: r.scoreColor }}>{r.score}</span>
                        <span style={{ fontSize: 9, color: C.textMuted, marginLeft: 4 }}>{r.delta}</span>
                      </div>
                      <div className="v2-port-col-num"><span style={{ fontSize: 11, fontWeight: 600 }}>{r.revenue}</span><span style={{ fontSize: 9, color: C.textMuted, display: "block" }}>/mo</span></div>
                      <div className="v2-port-col-num">
                        <svg width="34" height="12" viewBox="0 0 34 12" style={{ display: "block", margin: "0 auto" }}>
                          <polyline points={r.trend === "up" ? "0,10 8,7 16,6 24,4 34,2" : "0,2 8,4 16,6 24,8 34,10"} fill="none" stroke={r.trendColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontSize: 9, color: r.trendColor, fontWeight: 700 }}>{r.trendPct}</span>
                      </div>
                      <div className="v2-port-col-num"><span style={{ fontSize: 10, color: r.cadenceColor === "o" ? "#B88B15" : C.primaryLight, marginRight: 3 }}>{r.cadenceColor}</span><span style={{ fontSize: 10 }}>{r.cadence}</span></div>
                      <div className="v2-port-col-num" style={{ fontSize: 10 }}>{r.renews}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* curve: platform (warm) → combos (cream) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#EAE4D6" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 Q 720,-30 0,25 Z" fill={C.bg} /></svg>
      </div>

      {/* ══════ COMBOS — flowing wordmark tapestry ══════ */}
      <section className="v2-section-combos r-full-bleed">
        <div className="v2-combos-head">
          <div className="v2-eyebrow">More than AI</div>
          <h2 className="v2-combos-h2">Proprietary scoring combinations that predict and prevent churn.</h2>
          <p className="v2-combos-p">Twelve dimensions. Twenty combinations. Every client, every day.</p>
        </div>
        <V2ScrollBand items={dimensions} direction="left" speed={28} />
        <div className="v2-become">
          <span className="v2-become-rule" />
          <span className="v2-become-word">Become</span>
          <span className="v2-become-rule" />
        </div>
        <V2ScrollBand items={combinations} direction="right" speed={32} />
      </section>

      {/* ════ FEATURE TABS (preserved from old Home — to evaluate / decide) ════ */}
        {/* ══════════════ FEATURE TABS ══════════════ */}


      {/* curve: combos (cream) → audience (warm) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.bg }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,30 C 1100,140 340,-30 0,35 Z" fill="#EAE4D6" /></svg>
      </div>

      {/* ══════ AUDIENCE TABS ══════ */}
      <section className="v2-section-audience r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head" style={{ textAlign: "center", margin: "0 auto 32px", maxWidth: 820 }}>
            <div className="v2-eyebrow">Built for the way you work</div>
            <h2 className="v2-section-h2">Retayned is shaped <span className="v2-muted">to your book.</span></h2>
          </div>
          <div className="v2-audience-tabs-wrap">
            <div className="v2-audience-tabs">
              {[
                { k: "freelancers", l: "Freelancers" },
                { k: "agencies", l: "Agencies" },
                { k: "enterprise", l: "Enterprise" },
              ].map((t) => (
                <button
                  key={t.k}
                  className={"v2-audience-tab" + (audienceTab === t.k ? " v2-audience-tab-active" : "")}
                  onClick={() => setAudienceTab(t.k)}
                >
                  {t.l}
                </button>
              ))}
            </div>
          </div>
          <div className="v2-audience-content">
            <div>
              <h3 className="v2-audience-h">{panel.h}</h3>
              <p className="v2-audience-p">{panel.p}</p>
              <div className="v2-hero-cta-row">
                <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
                <button className="v2-btn-secondary-lg" onClick={() => setPage(panel.ctaTarget)}>{panel.cta}</button>
              </div>
            </div>
            <div className="v2-audience-demo">
              <div className="v2-demo-row"><div className="v2-demo-av" style={{ background: C.primaryLight }}>MK</div><div className="v2-demo-body"><div className="v2-demo-name">Meridian Co.</div><div className="v2-demo-meta">Last touch: 18 days ago</div></div><div className="v2-demo-sig" style={{ color: C.danger }}>↓ 26</div></div>
              <div className="v2-demo-row"><div className="v2-demo-av" style={{ background: C.primary }}>BF</div><div className="v2-demo-body"><div className="v2-demo-name">Baxter Firm</div><div className="v2-demo-meta">Score: 87 · strong</div></div><div className="v2-demo-sig" style={{ color: C.success }}>↑ 4</div></div>
              <div className="v2-demo-row"><div className="v2-demo-av" style={{ background: "#D4A017" }}>OP</div><div className="v2-demo-body"><div className="v2-demo-name">Otsego Partners</div><div className="v2-demo-meta">Q3 hiring mentioned</div></div><div className="v2-demo-sig" style={{ color: "#D4A017" }}>•</div></div>
              <div className="v2-demo-row"><div className="v2-demo-av" style={{ background: "#8A5136" }}>HL</div><div className="v2-demo-body"><div className="v2-demo-name">Hollis & Lee</div><div className="v2-demo-meta">1yr anniversary</div></div><div className="v2-demo-sig" style={{ color: C.primary }}>✦</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* curve: audience (warm) → enterprise (deep green) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: "#EAE4D6" }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,25 Q 720,140 0,20 Z" fill={C.primaryDeep} /></svg>
      </div>

      {/* ══════ ENTERPRISE ══════ */}
      <section className="v2-section-enterprise r-full-bleed">
        <div className="v2-section-inner">
          <div className="v2-section-head" style={{ textAlign: "center", margin: "0 auto 32px", maxWidth: 880 }}>
            <div className="v2-eyebrow v2-eyebrow-enterprise">Retayned Enterprise · Early access</div>
            <h2 className="v2-section-h2 v2-h2-enterprise">Two surfaces,<br /><span className="v2-accent-ent">one brain.</span></h2>
            <p className="v2-section-sub v2-sub-enterprise" style={{ margin: "0 auto" }}>Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both.</p>
          </div>

          {/* CTA moved above the dashboard */}
          <div className="v2-enterprise-cta-row" style={{ marginTop: 0, marginBottom: 48 }}>
            <button className="v2-btn-enterprise cta-btn" onClick={() => setPage("contact")}>Let's talk</button>
          </div>

          {/* 3 tiles first */}
          <div className="v2-enterprise-grid">
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">Managed agent</div>
              <h4 className="v2-enterprise-h">Rai as autonomous service</h4>
              <p className="v2-enterprise-p">Daily sweeps across your entire book. Twelve-dimension scoring. Archetype detection. Prioritized task lists delivered to whoever owns the relationship.</p>
            </div>
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">Multi-seat app</div>
              <h4 className="v2-enterprise-h">Your team, one view</h4>
              <p className="v2-enterprise-p">Unlimited seats. Role-based permissions. Full handoff history per client. When an account manager leaves, their knowledge stays.</p>
            </div>
            <div className="v2-enterprise-card">
              <div className="v2-enterprise-label">MCP + REST API</div>
              <h4 className="v2-enterprise-h">Plug into your stack</h4>
              <p className="v2-enterprise-p">Give your internal agents the same retention intelligence. Connect to Salesforce, HubSpot, or your homegrown CRM.</p>
            </div>
          </div>

          {/* RaiS Live view dashboard below */}
          <div className="r-ent-dashboard" style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: 28,
            position: "relative",
            overflow: "hidden",
            marginTop: 48,
            maxWidth: 1400,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <div aria-hidden="true" style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
            }} />

            {/* Dashboard header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 24, paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(85,139,104,0.2)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>RaiS · Live view</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Portfolio: 1,247 clients · Last sweep: 08:04</div>
                </div>
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 11px", borderRadius: 100,
                background: "rgba(45,134,89,0.15)",
                fontSize: 11, fontWeight: 600, color: "#7EC29A",
              }}>
                <span className="r-ent-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#7EC29A" }} />
                Running
              </div>
            </div>

            {/* Log output */}
            <div style={{
              background: "rgba(0,0,0,0.25)",
              borderRadius: 10,
              padding: "14px 16px",
              fontFamily: "'SF Mono', Menlo, Monaco, monospace",
              fontSize: 11.5,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              overflow: "hidden",
            }}>
              {[
                { time: "08:04", lvl: "SWEEP", lvlColor: C.primaryLight, msg: "Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk." },
                { time: "08:04", lvl: "ALERT", lvlColor: "#E89580", msg: "Foxglove Partners entered \"Velocity decay\" archetype. Confidence: 0.87." },
                { time: "08:05", lvl: "TASK ", lvlColor: "#7EC29A", msg: "Generated 92 tasks. 28 outreach emails drafted and queued for review." },
                { time: "08:05", lvl: "SYNC ", lvlColor: C.primaryLight, msg: "Dispatched to Slack (42), CRM (50). Next sweep: 08:04 tomorrow." },
              ].map((line, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 44 }}>{line.time}</span>
                  <span style={{ color: line.lvlColor, fontWeight: 700, minWidth: 50 }}>{line.lvl}</span>
                  <span style={{ flex: 1 }}>{line.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* curve: enterprise (deep green) → final (beige) */}
      <div className="v2-curve r-full-bleed r-no-pad" style={{ background: C.primaryDeep }}>
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path d="M 0,100 L 1440,100 L 1440,25 C 1080,-30 360,140 0,20 Z" fill="#F2EEE8" /></svg>
      </div>

      {/* ══════ TESTIMONIALS + STATS (7-cell mixed grid) ══════ */}
      <section className="r-full-bleed" style={{
        background: C.surfaceWarm,
        padding: "112px 48px",
      }}>
        <div style={{ maxWidth: 880, margin: "0 auto 56px", textAlign: "center" }}>
          <h3 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            What folks are saying.
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1320, margin: "0 auto" }} className="v2-testimonials-grid">

          {/* Cell 1 — stat: 90% */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">90%</div>
            <div className="v2-mix-stat-label">Of churn is predictable</div>
          </div>

          {/* Cell 2 — testimonial */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"I used to lose 2-3 clients a year and just accept it as cost of doing business. Retayned showed me an actual pattern. It was the same signs every time and we just ignored them. Not anymore!"</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>MK</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Agency Owner</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>50+ Clients</div>
              </div>
            </div>
          </div>

          {/* Cell 3 — stat: 25x */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">25x</div>
            <div className="v2-mix-stat-label">Cheaper to retain than acquire</div>
          </div>

          {/* Cell 4 — testimonial */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"It gave me the exact words to say to a client I was about to lose. I had the conversation that afternoon. They're still with me 8 months later. I'm still with Retayned."</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.btn, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>JR</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Freelancer</div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>1-5 Clients</div>
              </div>
            </div>
          </div>

          {/* Cell 5 — stat: 1+ */}
          <div className="v2-mix-cell v2-mix-stat">
            <div className="v2-mix-stat-num">1+</div>
            <div className="v2-mix-stat-label">Saved client pays for itself</div>
          </div>

          {/* Cell 6 — testimonial */}
          <div className="v2-mix-cell v2-mix-testimonial">
            <div style={{ display: "flex", gap: 2, marginBottom: 18 }}>
              {Array(5).fill(0).map((_, j) => <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>)}
            </div>
            <p className="v2-mix-quote">"The health check questions are uncomfortable in the best way. They force you to admit what you already know but haven't said out loud. It's something we thought we'd use for crises and it's turned into our daily operations hub."</p>
            <div className="v2-mix-footer">
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#92A596", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>Consultant</span>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: C.primarySoft, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em" }}>From our beta</span>
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>10-50 Clients</div>
              </div>
            </div>
          </div>

          {/* Cell 7 — stat: 5% increase (large headline style) */}
          <div className="v2-mix-cell v2-mix-stat v2-mix-stat-wide" style={{ gridColumn: "span 3" }}>
            <div className="v2-mix-stat-headline">
              A 5% increase in retention can boost profits by 95%.<sup style={{ fontSize: "0.4em", color: C.textMuted, verticalAlign: "super" }}>¹</sup>
            </div>
          </div>

        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="v2-section-final r-full-bleed">
        <h3 className="v2-final-h">
          You work too hard to get new clients.<br />Keep them{" "}
          <span className="v2-caveat-final">Retayned</span>.
        </h3>
        <p className="v2-final-sub">See the signal. Get the script. Keep the client.</p>
        <div className="v2-hero-cta-row" style={{ justifyContent: "center" }}>
          <button className="v2-btn-primary-lg cta-btn" onClick={() => setPage("signup")}>Start Free Trial</button>
        </div>
        <p className="v2-final-fine">14-day free trial. Cancel anytime.</p>
      </section>
      <Footer setPage={setPage} />
    </div>
  );
}


// ═══ HOME ═══
function Home({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [expandedText, setExpandedText] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const homeTabs = [
    { id: "today", label: "Today", icon: "◉", headline: "One page. Every priority.", sub: "Your Today tab knows which clients need you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value. Green clients surface first. At-risk clients with high revenue jump the line." },
    { id: "scoring", label: "Retention Score", icon: "◎", headline: "A number that means something.", sub: "12 dimensions. 20 combination signals. Health check modifiers. Every client gets a Retention Score from 1–99 that tells you exactly where the relationship stands — not where you hope it is." },
    { id: "health", label: "Health Checks", icon: "♡", headline: "Five questions. Two minutes. The truth.", sub: "Regular check-ins that detect drift before it becomes damage. Your answers blend directly into the Retention Score — bad news moves the number immediately. No lengthy forms. No busywork. Just the signal." },
    { id: "rai", label: "Talk to Rai", icon: "✦", headline: "She writes the words you need when it matters most.", sub: "Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script." },
    { id: "rolodex", label: "Rolodex", icon: "⟐", headline: "Your pipeline is forward-looking.", sub: "Former clients aren't dead relationships — they're future revenue. The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities." },
    { id: "referrals", label: "Referrals", icon: "⟡", headline: "Your best clients send you their friends.", sub: "Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do." },
  ];
  const ht = homeTabs[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes pulseGlow { 0%, 100% { box-shadow: 0 0 0 0 rgba(91,33,182,0.15); } 50% { box-shadow: 0 0 0 12px rgba(91,33,182,0); } }
        @keyframes fadeInPlace { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

        .r-serif { font-family: 'DM Serif Display', Georgia, serif; }

        .r-hero-cta {
          padding: 15px 32px; background: ${C.btn}; color: #fff;
          border: none; border-radius: 12px; font-size: 15px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .r-hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,33,182,0.25); }
        .r-hero-cta:active { transform: translateY(0); }

        .r-ghost-cta {
          padding: 15px 32px; background: transparent; color: ${C.text};
          border: 1.5px solid ${C.border}; border-radius: 12px; font-size: 15px;
          font-weight: 600; cursor: pointer; font-family: inherit;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s, background 0.2s;
        }
        .r-ghost-cta:hover { transform: translateY(-2px); border-color: ${C.btn}; background: rgba(91,33,182,0.04); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .r-ghost-cta:active { transform: translateY(0); }

        .r-tab-pill {
          padding: 10px 18px; border-radius: 10px; border: none; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 500;
          transition: all 0.25s ease; white-space: nowrap; flex: 0 0 auto;
          position: relative;
        }
        .r-tab-pill:hover { background: rgba(255,255,255,0.6); }
        .r-tab-pill[data-active="true"] {
          background: ${C.card}; color: ${C.primary}; font-weight: 700;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .r-mockup-card {
          background: ${C.card}; border-radius: 18px; border: 1px solid ${C.border};
          padding: 22px; box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .r-mockup-card:hover { transform: translateY(-3px); box-shadow: 0 16px 48px rgba(0,0,0,0.09), 0 4px 12px rgba(0,0,0,0.04); }

        .r-rai-alert-wrap {
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .r-rai-alert-wrap:hover {
          transform: translateY(-3px);
          filter: drop-shadow(0 8px 16px rgba(0,0,0,0.06));
        }

        .r-ent-feature {
          padding: 20px 18px; background: rgba(255,255,255,0.04);
          border-radius: 14px; border: 1px solid rgba(255,255,255,0.07);
          text-align: left; transition: all 0.3s ease;
        }
        .r-ent-feature:hover {
          background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }

        @keyframes rEntBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .r-ent-blink {
          display: inline-block;
          animation: rEntBlink 2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(126,194,154,0.6);
        }
        .r-ent-metric {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .r-ent-metric:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.1) !important;
        }

        .r-testimonial-card {
          background: ${C.card}; border-radius: 16px; padding: 28px 24px;
          border: 1px solid ${C.border}; display: flex; flex-direction: column;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04); height: 100%;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .r-testimonial-card:hover {
          transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }

        .r-grain {
          position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }

        .r-score-ring {
          width: 42px; height: 42px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 14px; flex-shrink: 0;
          font-family: inherit;
          transition: transform 0.2s;
        }

        @keyframes subtleBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }

        .r-alert-actions > div {
          flex: 1; padding: 11px; text-align: center; font-size: 13px;
          font-weight: 600; cursor: default;
        }
      `}</style>

      <div className="r-home">
        {/* ══════════════ HERO ══════════════ */}
        <div className="r-full-bleed r-hero-bg r-hero-section" style={{
          background: `radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, ${C.bg} 65%)`,
          padding: "56px 20px 72px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Subtle decorative elements */}
          <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #E4EDDF 0%, transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />
          <div className="r-hero-orb" style={{ position: "absolute", bottom: "-5%", left: "15%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(51,84,62,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Left — copy */}
            <div style={{ flex: "1 1 440px", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}>

              {/* Trust badge */}
              <div style={{ marginBottom: 20, opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.3s" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "6px 14px", borderRadius: 100,
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid rgba(216,223,216,0.6)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  fontSize: 12, fontWeight: 600, color: C.text,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, display: "inline-block" }} />
                  For freelancers, agencies, account reps, and mobsters
                </div>
              </div>

              <h1 style={{
                fontSize: 50, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.08,
                marginBottom: 24, color: C.text,
              }}>
                The CRM that{" "}
                <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
                  <span style={{ color: C.textMuted }}>predicts</span>
                  <span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} />
                  <span style={{ position: "absolute", top: "-0.7em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.75em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease 1.2s" }}>prevents</span>
                </span>{" "}
                churn.
              </h1>

              <p style={{
                fontSize: 17, lineHeight: 1.7, color: C.textSec, marginBottom: 10,
                maxWidth: 480, opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.5s",
              }}>
                <span style={{ fontWeight: 700, color: C.text }}>Stop losing clients you should have kept.</span>
              </p>
              <p style={{
                fontSize: 17, lineHeight: 1.65, color: C.textSec, marginBottom: 32,
                maxWidth: 480, opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.6s",
              }}>
                Traditional CRMs track deals. Retayned tracks the health of relationships — giving you client-specific solutions to keep and grow the business you've earned.
              </p>

              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "all 0.5s ease 0.7s", marginBottom: 16 }}>
                <button className="r-hero-cta" onClick={() => setPage("signup")}>
                  Start Free Trial
                  
                </button>
              </div>

              <p style={{ fontSize: 13, color: C.textMuted, opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease 0.9s", letterSpacing: "0.01em" }}>
                14-day free trial. Cancel anytime.
              </p>
            </div>

            {/* Right — interactive hero demo */}
            <div style={{ flex: "1 1 400px" }}>
              <HeroDemo loaded={loaded} />
            </div>
          </div>
        </div>

        {/* ══════════════ HOW IT WORKS ══════════════ */}
        <section className="r-how-it-works" style={{ padding: "48px 20px 64px" }}>
          <Reveal>
            <div className="r-section-head" style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{
                display: "inline-block", fontSize: 11, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: ".12em",
                color: C.btn, marginBottom: 12,
                padding: "5px 14px", borderRadius: 6,
                background: "rgba(91,33,182,0.06)",
              }}>How it works</div>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 8 }}>
                Meet Rai. She pays attention to every client, every day.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                When something shifts, she catches it — and tells you what to do about it.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "28px 24px", maxWidth: 1100, margin: "0 auto", justifyContent: "center" }}>
            {[
              { num: "01", title: "She sees it.", desc: "Cross-referencing tasks, health checks, score trends, 20+ combination signals — continuously, across your entire book.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
              { num: "02", title: "She calls it out.", desc: "Every morning, before your first coffee. You don't go looking for the problem. The problem finds you without any trouble.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
              { num: "03", title: "She ranks it.", desc: "Using a proprietary scoring engine, Rai weighs all of the day's tasks by retention impact. Your highest-value move is next up.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.15} style={{ flex: "1 1 300px", minWidth: 280, maxWidth: 360 }}>
                <div className={"r-notebook-card r-notebook-card-" + (i+1)} style={{
                  position: "relative",
                  padding: "28px 26px 30px 46px",
                  borderRadius: "0 4px 4px 0",
                  minHeight: 220,
                  background: "#FFFFFF",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
                }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                    opacity: 0.5, pointerEvents: "none",
                  }} />
                  <div aria-hidden="true" style={{
                    position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                    background: "rgba(0,0,0,0.15)", pointerEvents: "none",
                  }} />
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: C.text,
                    textTransform: "uppercase", letterSpacing: ".14em",
                    fontFamily: "'SF Mono', Menlo, monospace",
                    marginBottom: 12, opacity: 0.55,
                  }}>Step · {step.num}</div>
                  <div style={{ marginBottom: 12, opacity: 0.7 }}>{step.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, lineHeight: 1.25 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════ SCORING ENGINE (counter-directional) ══════════════ */}
        <section style={{ padding: "72px 20px 80px", background: C.bg }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 720, margin: "0 auto 56px" }}>
                <div style={{
                  display: "inline-block", fontSize: 11, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: ".12em",
                  color: C.primary, marginBottom: 14,
                  padding: "5px 14px", borderRadius: 6,
                  background: C.primarySoft,
                }}>More than AI</div>
                <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 12 }}>
                  Proprietary scoring combinations that predict and prevent churn.
                </h2>
              </div>
            </Reveal>

            {/* Dimensions scrolling LEFT */}
            <div style={{ overflow: "hidden", padding: "20px 0", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(90deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(270deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ display: "flex", gap: 52, alignItems: "baseline", whiteSpace: "nowrap", animation: "dimScroll 40s linear infinite", width: "max-content", padding: "8px 0" }}>
                {[...Array(2)].flatMap(() => [
                  { name: "Grace", style: { fontSize: 28, fontWeight: 400, letterSpacing: "0.02em", color: C.primary + "B0", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "TRUST", style: { fontSize: 24, fontWeight: 900, letterSpacing: "0.08em", color: C.primary + "D0" } },
                  { name: "communication", style: { fontSize: 15, fontWeight: 400, letterSpacing: "0.2em", color: C.primary + "90", textTransform: "uppercase" } },
                  { name: "Loyalty", style: { fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", color: C.primary + "B8", fontFamily: "'DM Serif Display', serif" } },
                  { name: "budget risk", style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: C.primary + "90", textTransform: "uppercase" } },
                  { name: "Depth", style: { fontSize: 30, fontWeight: 400, letterSpacing: "-0.03em", color: C.primary + "A5", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "STRESS", style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: C.primary + "90" } },
                  { name: "Expectations", style: { fontSize: 28, fontWeight: 400, letterSpacing: "0.02em", color: C.primary + "B0", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "FUNGIBILITY", style: { fontSize: 15, fontWeight: 400, letterSpacing: "0.2em", color: C.primary + "90" } },
                  { name: "tone", style: { fontSize: 30, fontWeight: 400, letterSpacing: "-0.03em", color: C.primary + "A5", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "AUTHORITY", style: { fontSize: 24, fontWeight: 900, letterSpacing: "0.08em", color: C.primary + "D0" } },
                  { name: "reporting", style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: C.primary + "90", textTransform: "uppercase" } },
                ]).map((d, i) => (
                  <span key={i} style={d.style}>{d.name}</span>
                ))}
              </div>
            </div>

            {/* BECOME divider */}
            <div style={{ padding: "32px 0", maxWidth: 720, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                <span style={{ flex: 1, height: 1, background: C.border, maxWidth: 260 }} />
                <span style={{
                  fontSize: 10.5, fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.14em",
                  color: C.textMuted, whiteSpace: "nowrap",
                }}>Become</span>
                <span style={{ flex: 1, height: 1, background: C.border, maxWidth: 260 }} />
              </div>
            </div>

            {/* Combinations scrolling RIGHT — alternating green/red */}
            <div style={{ overflow: "hidden", padding: "20px 0", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(90deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(270deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ display: "flex", gap: 56, alignItems: "baseline", whiteSpace: "nowrap", animation: "dimScrollReverse 44s linear infinite", width: "max-content", padding: "8px 0" }}>
                {[...Array(2)].flatMap(() => [
                  { name: "Bulletproof", type: "pos", style: { fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em" } },
                  { name: "Ice Wall", type: "neg", style: { fontSize: 22, fontWeight: 300, fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "LOCKED VAULT", type: "pos", style: { fontSize: 18, fontWeight: 900, letterSpacing: "0.12em" } },
                  { name: "On the Clock", type: "neg", style: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" } },
                  { name: "Cornerstone", type: "pos", style: { fontSize: 24, fontWeight: 400, fontFamily: "'DM Serif Display', serif" } },
                  { name: "Silent Exit", type: "neg", style: { fontSize: 22, fontWeight: 400, fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "DECISION EXPRESS", type: "pos", style: { fontSize: 17, fontWeight: 900, letterSpacing: "0.12em" } },
                  { name: "NO ROOM TO OPERATE", type: "neg", style: {
                    fontSize: 26, fontWeight: 900,
                    fontFamily: "'Arial Narrow', 'Helvetica Neue Condensed', Impact, sans-serif",
                    fontStretch: "condensed",
                    letterSpacing: "-0.04em",
                    transform: "scaleX(0.72)",
                    transformOrigin: "center",
                    display: "inline-block",
                  } },
                ]).map((c, i) => (
                  <span key={i} style={{ ...c.style, color: c.type === "pos" ? "rgba(45,134,89,0.9)" : "rgba(196,67,43,0.88)" }}>{c.name}</span>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div style={{ textAlign: "center", marginTop: 48, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => setPage("signup")} style={{
                padding: "13px 28px", background: C.btn, color: "#fff",
                border: "none", borderRadius: 12,
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Start Free Trial
              </button>
              <button onClick={() => setPage("platform")} style={{
                padding: "13px 28px", background: "#fff", color: C.btn,
                border: "1.5px solid " + C.btn, borderRadius: 12,
                fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                See All Features
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════ 5% STAT BAR ══════════════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #8FB89E 50%, ${C.bg} 100%)`,
          padding: "72px 20px",
          position: "relative", overflow: "hidden",
        }}>

          <h2 style={{
            fontSize: 26, fontWeight: 800, lineHeight: 1.25, textAlign: "center",
            margin: "0 auto", color: C.text, letterSpacing: "-0.03em", position: "relative", zIndex: 2,
            maxWidth: 900,
          }}>
            A 5% increase in retention can boost profits by 95%.
            <sup style={{ fontSize: "0.35em", color: C.textMuted, verticalAlign: "super" }}>¹</sup>
          </h2>

          {/* Fade separator */}
          <div style={{ width: 120, height: 1, background: `linear-gradient(90deg, transparent, ${C.border}, transparent)`, margin: "28px auto 0", position: "relative", zIndex: 2 }} />

          {/* Stats row */}
          <div className="r-stats-row" style={{ display: "flex", gap: 16, maxWidth: 1400, margin: "24px auto 0", position: "relative", zIndex: 2 }}>
            {[
              { num: "90", suffix: "%", label: "Of churn is predictable" },
              { num: "25", suffix: "x", label: "Cheaper to retain than acquire" },
              { num: "1", suffix: "+", label: "Saved client pays for itself" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "16px 0" }}>
                <div className="r-stats" style={{
                  fontSize: 48, fontWeight: 900, letterSpacing: "-0.04em",
                  color: C.primary, lineHeight: 1, marginBottom: 6,
                }}>
                  <AnimatedStat value={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════ FEATURE TABS ══════════════ */}
        <section className="r-feat-section" style={{ padding: "64px 20px 64px" }}>
          <Reveal>
            <div className="r-section-head" style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 8 }}>
                Tools You Need To Keep Clients
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
                A CRM you won't hate using built for client retention. Your clients won't know it exists. They just won't leave.
              </p>
            </div>
          </Reveal>

          {/* Tab bar */}
          <div className="r-tab-bar-wrap" style={{
            display: "flex", gap: 4, background: C.surface, borderRadius: 12,
            padding: 5, overflowX: "auto", maxWidth: 740,
            margin: "0 auto 40px", WebkitOverflowScrolling: "touch",
          }}>
            {homeTabs.map((feat, i) => (
              <button
                key={feat.id}
                className="r-tab-pill r-tab-btn"
                data-active={i === activeTab}
                onClick={() => { setActiveTab(i); setExpandedText(false); }}
                style={{
                  background: i === activeTab ? C.card : "transparent",
                  color: i === activeTab ? C.primary : C.textMuted,
                  fontWeight: i === activeTab ? 700 : 500,
                  boxShadow: i === activeTab ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                }}
              >
                <span style={{ marginRight: 4, opacity: i === activeTab ? 1 : 0.5 }}>{feat.icon}</span>
                {feat.label}
              </button>
            ))}
          </div>

          {/* Feature content */}
          {/* Mobile: headline → mockup → description + CTAs */}
          {/* Desktop: left (headline + desc + CTAs) | right (mockup) */}
          <div className="r-feat-heading-mobile" style={{ display: "none", maxWidth: 1000, margin: "0 auto 16px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15 }}>{ht.headline}</h2>
          </div>
          <div className="r-feat-content" style={{
            display: "flex", flexWrap: "wrap", gap: 48,
            alignItems: "flex-start", maxWidth: 1000, margin: "0 auto",
          }}>
            {/* Left: copy */}
            <div style={{ flex: "1 1 340px" }}>
              <h2 className="r-feat-heading-desktop" style={{
                fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15,
                marginBottom: 12,
              }}>{ht.headline}</h2>
              <p style={{
                fontSize: 15, color: C.textSec, lineHeight: 1.75, marginBottom: 28,
              }}>{ht.sub}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="r-hero-cta" onClick={() => setPage("signup")} style={{ padding: "13px 26px", fontSize: 14 }}>
                  Try Free Now 
                </button>
                <button className="r-ghost-cta" onClick={() => setPage("platform")} style={{ padding: "13px 26px", fontSize: 14 }}>
                  See All Features
                </button>
              </div>
            </div>

            {/* Right: visual mockup */}
            <div style={{ flex: "1 1 360px" }}>
              <div key={ht.id} style={{ animation: "fadeInScale 0.35s ease" }}>
                {ht.id === "today" && <TodayDemo />}
                {ht.id === "scoring" && (
                  <div className="r-mockup-card">
                    <div style={{ textAlign: "center", marginBottom: 20 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Retention Score</div>
                      <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "3px solid #92400E20", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 36, fontWeight: 900, color: "#92400E", fontFamily: "inherit" }}>67</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>Broadleaf Media</div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Rachel Chen · Account Lead</div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                      {[["Trust", 6, C.warning], ["Loyalty", 7, C.primaryLight], ["Expectations", 7, C.primaryLight], ["Grace", 5, C.warning]].map(([name, val, color]) => (
                        <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: C.bg, borderRadius: 8, fontSize: 13 }}>
                          <span style={{ color: C.textMuted }}>{name}</span>
                          <span style={{ fontWeight: 800, color, fontFamily: "inherit" }}>{val}/10</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                      <div style={{ flex: 1, padding: "6px 10px", background: "#FEE2E2", borderRadius: 8, fontSize: 11, color: "#991B1B", fontWeight: 700, textAlign: "center" }}>No room to operate</div>
                      <div style={{ flex: 1, padding: "6px 10px", background: "#FEF3C7", borderRadius: 8, fontSize: 11, color: "#92400E", fontWeight: 700, textAlign: "center" }}>Ice wall</div>
                    </div>
                  </div>
                )}
                {ht.id === "health" && (
                  <div className="r-mockup-card">
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Health Check — Broadleaf Media</div>
                    <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
                      {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 2 ? C.primary : C.borderLight, transition: "background 0.3s" }} />)}
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Has anything changed with this relationship?</p>
                    {["Nothing — same as always", "Something minor, could be nothing", "Noticeably different from before", "Something has clearly changed"].map((opt, i) => (
                      <div key={i} style={{
                        padding: "12px 16px", borderRadius: 10, marginBottom: 5,
                        background: i === 2 ? C.primarySoft : C.bg,
                        border: "1.5px solid " + (i === 2 ? C.primary : C.borderLight),
                        fontSize: 14, color: i === 2 ? C.primary : C.textSec,
                        fontWeight: i === 2 ? 600 : 400,
                        cursor: "pointer", transition: "all 0.15s",
                      }}>{opt}</div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                      <span style={{ fontSize: 12, color: C.textMuted }}>2 of 5</span>
                      <div style={{ padding: "8px 20px", background: C.primary, color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>Next</div>
                    </div>
                  </div>
                )}
                {ht.id === "rai" && (
                  <div className="r-mockup-card">
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Talk to Rai</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "12px 16px", background: C.primary, color: "#fff", borderRadius: "14px 14px 4px 14px", fontSize: 14, lineHeight: 1.55 }}>
                        Rachel at Broadleaf has been different lately. What should I do?
                      </div>
                      <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "14px 16px", background: C.bg, borderRadius: "14px 14px 14px 4px", fontSize: 14, lineHeight: 1.65, border: "1px solid " + C.borderLight }}>
                        <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>✦ Rai</div>
                        Rachel's score dropped from 78 to 67 over two check-ins. The "No room to operate" combo just triggered — low trust combined with low grace. <strong>Call her. Not email.</strong> Ask directly: "I've noticed things feel different. What's on your mind?"
                      </div>
                      <div style={{ alignSelf: "flex-start", maxWidth: "80%", padding: "10px 14px", background: C.primarySoft, borderRadius: "14px 14px 14px 4px", fontSize: 13, color: C.primary, fontStyle: "italic", border: "1px solid " + C.primarySoft }}>
                        I've flagged a profile re-evaluation for Broadleaf. Want me to queue that up?
                      </div>
                    </div>
                  </div>
                )}
                {ht.id === "rolodex" && (
                  <div className="r-mockup-card">
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Rolodex</div>
                    {[
                      { name: "Maplewood Agency", type: "Former", months: "14mo together", tags: ["Would refer", "Would come back"], priority: "high" },
                      { name: "Clearpoint Digital", type: "One-off", months: "Site audit", tags: ["Would refer"], priority: "medium" },
                      { name: "Harlow & Associates", type: "Former", months: "8mo together", tags: ["Would come back"], priority: "high" },
                    ].map((r, i) => (
                      <div key={i} style={{ padding: "13px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                            <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>{r.type} · {r.months}</span>
                          </div>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.priority === "high" ? C.success : C.warning }} />
                        </div>
                        <div style={{ display: "flex", gap: 5 }}>
                          {r.tags.map(t => (
                            <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: C.primarySoft, color: C.primary }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 12, fontSize: 13, color: C.btn, fontWeight: 700 }}>3 re-engagement opportunities</div>
                  </div>
                )}
                {ht.id === "referrals" && (
                  <div className="r-mockup-card">
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Referral Intelligence</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                      {[["Total", "7"], ["Converted", "4"], ["Revenue", "$18.4k"]].map(([label, val]) => (
                        <div key={label} style={{ background: C.bg, borderRadius: 10, padding: 12, textAlign: "center" }}>
                          <div style={{ fontSize: 22, fontWeight: 900, color: C.primary, fontFamily: "inherit" }}>{val}</div>
                          <div style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>{label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Ready to refer</div>
                    {[
                      { name: "Northvane Studios", readiness: 94, contact: "Sarah Chen" },
                      { name: "Oakline Outdoors", readiness: 76, contact: "James Park" },
                    ].map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid " + C.borderLight }}>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                          <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>{r.contact}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 52, height: 5, borderRadius: 3, background: C.borderLight, overflow: "hidden" }}>
                            <div style={{ width: `${r.readiness}%`, height: "100%", background: `linear-gradient(90deg, ${C.primaryLight}, ${C.success})`, borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 800, color: C.success }}>{r.readiness}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ TOP EDGE: three stacked circles (B) ══════════════ */}
        <div className="r-full-bleed r-ent-top-edge" aria-hidden="true" style={{
          position: "relative",
          height: 140,
          background: C.bg,
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, bottom: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", bottom: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, bottom: "-140%" }} />
        </div>

        {/* ══════════════ ENTERPRISE ══════════════ */}
        <div className="r-full-bleed r-ent-section" style={{
          background: C.primaryDeep,
          padding: "72px 20px 96px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          marginTop: -1,
        }}>
          {/* Interior depth: soft center glow + subtle purple corner */}
          <div aria-hidden="true" style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 800px 500px at 50% 40%, rgba(85,139,104,0.16) 0%, transparent 65%), radial-gradient(ellipse 400px 300px at 15% 100%, rgba(91,33,182,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="r-grain" />

          <Reveal><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            {/* Tag row */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "5px 12px 5px 10px", borderRadius: 100,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.02em",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, boxShadow: "0 0 8px rgba(45,134,89,0.6)" }} />
                Retayned Enterprise · Early access
              </div>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
            </div>

            {/* Headline + body */}
            <h2 className="r-ent-h2" style={{
              fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em",
              lineHeight: 1.05, color: "#fff", margin: "0 0 16px",
              maxWidth: 820,
            }}>
              Two surfaces,<br />
              <span style={{ color: C.primaryLight }}>one brain.</span>
            </h2>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
              margin: "0 0 48px", maxWidth: 640,
            }}>
              Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both.
            </p>

            {/* Live Dashboard — product object */}
            <div className="r-ent-dashboard" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: 28,
              position: "relative",
              overflow: "hidden",
              marginBottom: 40,
            }}>
              {/* Top hairline */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }} />

              {/* Dashboard header */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 24, paddingBottom: 16,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(85,139,104,0.2)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>RaiS · Live view</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Portfolio: 1,247 clients · Last sweep: 08:04</div>
                  </div>
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 11px", borderRadius: 100,
                  background: "rgba(45,134,89,0.15)",
                  fontSize: 11, fontWeight: 600, color: "#7EC29A",
                }}>
                  <span className="r-ent-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#7EC29A" }} />
                  Running
                </div>
              </div>

              {/* Metrics grid — the 4 features embedded as live states */}
              <div className="r-ent-metrics" style={{
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12,
                marginBottom: 16,
              }}>
                {[
                  { label: "Scored today", val: "1,247", suffix: "/1,247", delta: "All current", deltaColor: "#7EC29A" },
                  { label: "At-risk flagged", val: "38", delta: "+4 from yesterday", deltaColor: "#E89580" },
                  { label: "Tasks generated", val: "92", delta: "28 emails ready to send", deltaColor: "#7EC29A" },
                  { label: "Archetypes active", val: "9", delta: "Velocity decay trending", deltaColor: "rgba(255,255,255,0.5)" },
                ].map(m => (
                  <div key={m.label} className="r-ent-metric" style={{
                    padding: "14px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 10,
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: ".08em", color: "rgba(255,255,255,0.4)", marginBottom: 8,
                    }}>{m.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {m.val}
                      {m.suffix && <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{m.suffix}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: m.deltaColor, fontWeight: 600, marginTop: 6 }}>{m.delta}</div>
                  </div>
                ))}
              </div>

              {/* Log output */}
              <div style={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: 10,
                padding: "14px 16px",
                fontFamily: "'SF Mono', Menlo, Monaco, monospace",
                fontSize: 11.5,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                overflow: "hidden",
              }}>
                {[
                  { time: "08:04", lvl: "SWEEP", lvlColor: C.primaryLight, msg: "Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk." },
                  { time: "08:04", lvl: "ALERT", lvlColor: "#E89580", msg: "Foxglove Partners entered \"Velocity decay\" archetype. Confidence: 0.87." },
                  { time: "08:05", lvl: "TASK ", lvlColor: "#7EC29A", msg: "Generated 92 tasks. 28 outreach emails drafted and queued for review." },
                  { time: "08:05", lvl: "SYNC ", lvlColor: C.primaryLight, msg: "Dispatched to Slack (42), CRM (50). Next sweep: 08:04 tomorrow." },
                ].map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 44 }}>{line.time}</span>
                    <span style={{ color: line.lvlColor, fontWeight: 700, minWidth: 50 }}>{line.lvl}</span>
                    <span style={{ flex: 1 }}>{line.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="r-ent-cta-row" style={{
              display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
            }}>
              <button className="r-hero-cta" onClick={() => setPage("contact")} style={{
                background: "#fff", color: C.btn,
                padding: "14px 28px", fontSize: 14,
              }}>Request Early Access</button>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                Onboarding 3 partners per quarter.<br />
                Custom pricing based on portfolio size.
              </div>
            </div>
          </div></Reveal>
        </div>

        {/* ══════════════ BOTTOM EDGE: mirrored three circles ══════════════ */}
        <div className="r-full-bleed r-ent-bottom-edge" aria-hidden="true" style={{
          position: "relative",
          height: 140,
          background: C.bg,
          overflow: "hidden",
          marginTop: -1,
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, top: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", top: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, top: "-140%" }} />
        </div>

        {/* ══════════════ TESTIMONIALS ══════════════ */}
        <section style={{
          padding: "48px 20px 40px",
          boxShadow: "inset 0 1px 0 rgba(0,0,0,0.04)",
        }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>What Folks Are Saying</h2>
            <p style={{ fontSize: 16, color: C.textSec }}>From our own Retayned business.</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { quote: "I used to lose 2-3 clients a year and just accept it as cost of doing business. Retayned showed me an actual pattern. It was the same signs every time and we just ignored them. Not anymore!", name: "Agency Owner", role: "50+ Clients", stars: 5, initials: "MK", color: "#558B68" },
              { quote: "It gave me the exact words to say to a client I was about to lose. I had the conversation that afternoon. They're still with me 8 months later. I'm still with Retayned.", name: "Freelancer", role: "1-5 Clients", stars: 5, initials: "JR", color: "#5B21B6" },
              { quote: "The health check questions are uncomfortable in the best way. They force you to admit what you already know but haven't said out loud. It's something we thought we'd use for crises and it's turned into our daily operations hub.", name: "Consultant", role: "10-50 Clients", stars: 5, initials: null, color: "#92A596", beta: true },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.12} style={{ flex: "1 1 300px", minWidth: 280 }}>
                <div className="r-testimonial-card">
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {Array(t.stars).fill(0).map((_, j) => (
                      <span key={j} style={{ fontSize: 16, color: "#E6A817" }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: C.text, lineHeight: 1.65, marginBottom: 20, fontStyle: "italic", flex: 1 }}>"{t.quote}"</p>
                  <div style={{ borderTop: "1px solid " + C.borderLight, paddingTop: 14, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {t.initials ? (
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{t.initials}</span>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      )}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{t.name}</span>
                        {t.beta && <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: C.primarySoft, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em" }}>From our beta</span>}
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════ CONFERENCE IMAGE ══════════════ */}
        <div className="r-conf r-full-bleed r-no-pad" style={{ padding: "0", marginBottom: 40 }}>
          <div className="r-conf-inner" style={{ margin: "0 auto", position: "relative" }}>
            <img className="r-conf-img" src="/retayned-conference.jpg" alt="Retayned team at conference" style={{ width: "100%", display: "block" }} />
            {/* Bottom gradient for overlay legibility */}
            <div aria-hidden="true" style={{
              position: "absolute", left: 0, right: 0, bottom: 0,
              height: "55%",
              background: "linear-gradient(180deg, transparent 0%, rgba(28,50,36,0.45) 45%, rgba(28,50,36,0.92) 100%)",
              borderBottomLeftRadius: "inherit",
              borderBottomRightRadius: "inherit",
              pointerEvents: "none",
            }} />
            {/* Overlay headline */}
            <div className="r-conf-overlay" style={{
              position: "absolute", left: 0, right: 0, bottom: 0,
              padding: "36px 32px",
              textAlign: "center",
            }}>
              <p style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                maxWidth: 720,
                margin: "0 auto",
                textShadow: "0 2px 16px rgba(0,0,0,0.4)",
              }}>
                We don't go to conferences. But if we did, it'd probably look like this.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════ FAQ + FINAL CTA ══════════════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 20%, #4A7B5E 55%, #1E261F 100%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ padding: "48px 20px 0" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: 56 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
              <FAQ fullBleed />
            </div>
          </div>

          <div className="r-grain" style={{ opacity: 0.04 }} />
          <div style={{ padding: "72px 20px 96px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{
              fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff",
            }}>
              You work too hard to get new clients.<br />
              Keep them Retayned.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 28, lineHeight: 1.6 }}>
              See the signal. Get the script. Keep the client.
            </p>
            <button className="r-hero-cta" onClick={() => setPage("signup")} style={{
              background: "#fff", color: C.btn, padding: "16px 40px", fontSize: 16,
              animation: "pulseGlow 3s ease-in-out infinite",
            }}>
              Start Free Trial
            </button>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>
              14-day free trial. Cancel anytime.
            </p>
          </div>

          {/* ── Inline Footer (inside gradient) ── */}
          <div style={{ padding: "32px 20px 24px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => setPage("home")}>
                <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.7)", fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.7)", marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>There's no "i" in Retayned.</div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              {[["platform","Platform"],["pricing","Pricing"],["faq","FAQs"],["contact","Contact"],["privacy","Privacy"],["terms","Terms"]].map(([id, label]) => (
                <span key={id} onClick={() => setPage(id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(id)} style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>{label}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.5 }}>
                <sup>1</sup> Reichheld, F. & Schefter, P. "The Economics of E-Loyalty." Harvard Business School / Bain & Company.
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>© {new Date().getFullYear()} Maniac Digital, LLC</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}


// ═══ PRICING ═══
function Pricing({ setPage }) {

  return (
    <>
      {/* ONE continuous gradient wraps the entire page, flowing cream → sage → deep green → footer black */}
      <div className="r-full-bleed r-no-pad" style={{
        background: `linear-gradient(180deg, ${C.bg} 0%, #E8F0E9 18%, #A8C4B0 38%, #4A7B5E 62%, ${C.primaryDeep} 85%)`,
        position: "relative", overflow: "hidden",
      }}>
        <div className="r-grain" style={{ opacity: 0.05 }} />

        {/* ══════ Hero ══════ */}
        <section style={{ padding: "56px 20px 24px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16, color: C.text }}>One client saved pays for{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: C.textMuted }}>a year<span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} /></span>
              <span style={{ position: "absolute", top: "-0.55em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>years</span>
            </span>{" "}of Retayned.
          </h1>
          <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.65 }}>One plan. Every feature. The math works itself out.</p>
        </section>

        {/* ══════ The price card — pure white floating ticket ══════ */}
        <section style={{ padding: "32px 20px 48px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 580, margin: "0 auto" }}>
            <div style={{
              background: "#FFFFFF",
              borderRadius: 24,
              padding: "56px 40px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.04)",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.primary, marginBottom: 24 }}>One plan. Every feature.</div>

              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 12 }}>
                <span style={{ fontSize: 72, fontWeight: 900, letterSpacing: "-0.04em", color: C.text, lineHeight: 1 }}>$19.99</span>
                <span style={{ fontSize: 18, color: C.textMuted, fontWeight: 600 }}>/mo</span>
              </div>
              <div style={{ fontSize: 16, color: C.textSec, marginBottom: 18, lineHeight: 1.5 }}>+ <span style={{ fontWeight: 700, color: C.text }}>$1 per client</span></div>
              <p style={{ fontSize: 15, color: C.text, marginBottom: 32, lineHeight: 1.5, maxWidth: 420, margin: "0 auto 32px", letterSpacing: "-0.01em" }}>Solve your business's most consequential problem for less than a Netflix subscription.</p>

              <button className="cta-btn" onClick={() => setPage("signup")} style={{
                width: "100%", padding: "16px 20px", borderRadius: 14,
                fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                background: C.btn, color: "#fff", border: "none",
                boxShadow: "0 6px 20px rgba(91,33,182,0.25)",
              }}>Start Free Trial</button>
              <p style={{ fontSize: 12.5, color: C.textMuted, marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
            </div>
          </div>
        </section>

        {/* ══════ Features grid — sits on the gradient directly as translucent white chips ══════ */}
        <section style={{ padding: "16px 20px 56px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.textMuted, marginBottom: 20, textAlign: "center" }}>Everything's included</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
              {[
                { label: "Today", desc: "Prioritized tasks, ranked by impact" },
                { label: "Retention Score (1–99)", desc: "12 dimensions, 20 combinations" },
                { label: "Health Checks", desc: "Monthly cadence, scored drift" },
                { label: "Talk to Rai", desc: "Unlimited chats, calibrated scripts" },
                { label: "Rolodex", desc: "Former clients, ready to re-engage" },
                { label: "Referrals", desc: "Readiness scoring, right-time asks" },
              ].map((f, i) => (
                <div key={i} style={{
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.6)",
                  borderRadius: 11,
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: C.text, marginBottom: 1 }}>{f.label}</div>
                    <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.4 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: C.textSec, textAlign: "center", marginTop: 16, fontStyle: "italic" }}>Unlimited team members · No per-seat fees · No tiers</div>
          </div>
        </section>

        {/* ══════ Enterprise referral strip — sits after features grid ══════ */}
        <section style={{ padding: "16px 20px 48px", position: "relative", zIndex: 2 }}>
          <div style={{
            maxWidth: 720,
            margin: "0 auto",
            background: C.primaryDeep,
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 16,
            padding: "24px 28px",
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: "1 1 320px", color: "#fff" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: C.primaryLight, marginBottom: 6 }}>Retayned Enterprise · Early Access</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: "-0.02em" }}>Relationship intelligence, scaled.</div>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.5 }}>For the teams and agents managing your book. Multi-seat plumbing, manager dashboards, agent API.</div>
            </div>
            <button onClick={() => setPage("contact")} className="cta-btn" style={{
              padding: "11px 22px", background: "transparent",
              color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)",
              borderRadius: 10, fontSize: 13.5, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}>Request Early Access</button>
          </div>
        </section>

        {/* ══════ The math — merged closer ══════ */}
        <section style={{ padding: "32px 20px 40px", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>The math</div>
            <div style={{
              background: "#FFFFFF",
              borderRadius: 16,
              padding: "28px 24px",
              maxWidth: 560,
              margin: "0 auto",
              textAlign: "left",
              boxShadow: "0 20px 48px rgba(0,0,0,0.15)",
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="r-math-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <span className="r-math-label" style={{ fontSize: 14, color: C.textSec, lineHeight: 1.35, flex: "1 1 auto", minWidth: 0 }}>You charge one client, say</span>
                  <span className="r-math-value" style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>$2,500<span style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>/mo</span></span>
                </div>
                <div className="r-math-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, paddingBottom: 14, borderBottom: "1px dashed " + C.borderLight }}>
                  <span className="r-math-label" style={{ fontSize: 14, color: C.textSec, lineHeight: 1.35, flex: "1 1 auto", minWidth: 0 }}>Retayned costs you, monthly</span>
                  <span className="r-math-value" style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>$19.99<span style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}> + $1/client</span></span>
                </div>
                <div className="r-math-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
                  <span className="r-math-label" style={{ fontSize: 14, fontWeight: 700, color: C.primary, lineHeight: 1.35, flex: "1 1 auto", minWidth: 0 }}>One saved client could cover</span>
                  <span className="r-math-value" style={{ fontSize: 26, fontWeight: 900, color: C.primary, letterSpacing: "-0.02em", fontFamily: "inherit", whiteSpace: "nowrap", flexShrink: 0 }}>125 months</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ The payoff + CTA ══════ */}
        <section style={{ padding: "8px 20px 72px", textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.25, marginBottom: 28, color: "#fff", maxWidth: 720, margin: "0 auto 28px" }}>
            Saving just <em style={{ fontStyle: "normal", fontWeight: 900 }}>ONE</em> relationship for even just <em style={{ fontStyle: "normal", fontWeight: 900 }}>ONE</em> month could pay for Retayned for a <em style={{ fontStyle: "normal", fontWeight: 900 }}>DECADE</em>.
          </h2>
          <button className="cta-btn" onClick={() => setPage("signup")} style={{ padding: "16px 40px", background: "#fff", color: C.btn, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
        </section>

        <InlineFooter setPage={setPage} />
      </div>
    </>
  );
}

// ═══ ABOUT ═══
function About({ setPage }) {
  return (
    <>
      <section style={{ padding: "56px 20px 20px" }}>
        <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 16 }}>
          Built by a team that's kept clients for{" "}
          <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
            <span style={{ color: C.textMuted }}>years<span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} /></span>
            <span style={{ position: "absolute", top: "-0.55em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>a decade+</span>
          </span>.
        </h1>
        <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.65 }}>Retayned wasn't planned. We kept clients for 10+ years through COVID, work from home, digital transformation, fun AI, scary AI, and everything in between. We assumed what we were doing was normal. When we found out we were doing something genuinely special, we wanted to share it.</p>
      </section>

      {/* Founder */}
      <section style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src={HEADSHOT} alt="Adam Lawrence" style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover", objectPosition: "center 15%" }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>Adam Lawrence</div>
            <div style={{ fontSize: 13, color: C.textMuted }}>Founder</div>
          </div>
        </div>
      </section>

      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: C.card, borderRadius: 16, padding: "32px 28px", border: "1px solid " + C.border, boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.textMuted, marginBottom: 18 }}>The backstory</div>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.7 }}>
            <p style={{ marginBottom: 14 }}>Adam Lawrence spent most of his career running a paid social agency, managing campaigns and client relationships for agencies, DTC brands, and enterprise clients.</p>
            <p style={{ marginBottom: 14 }}>Over that time, one pattern became impossible to ignore: he rarely lost accounts. And even when he did, the client would often come back later or refer business.</p>
            <p style={{ marginBottom: 14 }}>At first, he wasn't sure why. So he dug in. Sure, the ad performance was great — but other agencies had comparable results. It wasn't pricing; he wasn't close to the cheapest option. He kept looking until one day he found the answer.</p>
            <p style={{ marginBottom: 14, padding: "16px 20px", background: C.primarySoft, borderRadius: 10, borderLeft: "3px solid " + C.primary }}><em>The Founder</em> moment: a potential client said: <strong>"You're not in the paid social business. You're in the client retention business."</strong></p>
            <p style={{ marginBottom: 14 }}>That hit different. Because it was true.</p>
            <p style={{ marginBottom: 14 }}>So we all got to work. We profiled how each client communicated — were they direct or did they hint? We tracked what they actually cared about versus what they said they cared about. We watched for the subtle signals — response times slowing, meetings getting cancelled, feedback shifts. And when those signals appeared, we didn't avoid the conversation. We had it early, with the right framing, and with words that acknowledged what was really going on.</p>
            <p style={{ marginBottom: 14, fontStyle: "italic" }}>We were doing retention engineering without knowing it had a name.</p>
            <p style={{ marginBottom: 14 }}>The problem was that it all lived in our heads. There was no system. No dashboard. No way to scale it beyond the accounts we personally touched. When we looked for a tool that did what we were doing instinctively, it didn't exist. The enterprise churn platforms cost $1,500+/month and takes months to learn. The freelancer CRMs were glorified invoicing tools wearing a "retention" hat. There was no such tool.</p>
            <p style={{ marginBottom: 14 }}>So we built it.</p>
            <p>Retayned does something almost every CRM doesn't: it looks 👀. It reads the signals, profiles the relationship, and gives simple, digestible notes to delight your clients. Together, we can move on from clients moving on.</p>
          </div>
        </div>
      </section>
      <div className="r-full-bleed" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`, padding: "140px 20px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640, margin: "0 auto", paddingBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>Turn client relationships<br />into lifelong partnerships.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 28, lineHeight: 1.6 }}>The tool we built for ourselves. Now yours.</p>
          <button className="cta-btn" onClick={() => setPage("signup")} style={{ padding: "16px 40px", background: "#fff", color: C.btn, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
        </div>
        <InlineFooter setPage={setPage} />
      </div>
    </>
  );
}

// ═══ BLOG POSTS ═══
const blogPostData = [
  {
    title: "Why your best clients leave without warning",
    desc: "It's not performance. It's the gap between what they expected and what they experienced.",
    tag: "Retention",
    readTime: "4 min",
    body: [
      "You delivered great work. The metrics were solid. The client said everything was fine. Then one Tuesday, they emailed to say they were \"going in a different direction.\" No fight. No complaint. No warning.",
      "This is the most common way good clients leave. Not with a blow-up, but with a slow fade that only looks sudden in hindsight.",
      "Here's what actually happened: somewhere along the way, a gap opened between what the client expected and what they experienced. Not in quality — in the relationship itself. Maybe they expected a proactive partner and got a reactive one. Maybe they expected to feel like a priority and started feeling like a task. Maybe they expected transparency and got polished reports that hid the messy truth.",
      "The work was fine. The relationship wasn't.",
      "We've seen this pattern dozens of times. The client stops giving detailed feedback. Replies get shorter. Meetings get rescheduled. They stop pushing back — which feels like agreement but is actually disengagement. By the time they tell you, the decision was made weeks ago.",
      "The fix isn't more status reports or check-in meetings. It's learning to read the signals that predict this gap before it becomes a canyon. That's what Retayned's Health Check system is built for: five questions that force you to confront what you already know but haven't said out loud.",
      "The clients you lose aren't the ones who complain. They're the ones who go quiet.",
    ]
  },
  {
    title: "The 5 questions that predict client churn",
    desc: "Forget satisfaction surveys. These five questions force honesty — and the answers tell you everything.",
    tag: "Health Checks",
    readTime: "5 min",
    body: [
      "Satisfaction surveys are useless for predicting churn. A client can be satisfied on Tuesday and gone by Friday. Satisfaction is a snapshot of politeness, not a measure of loyalty.",
      "After years of watching clients leave and trying to reverse-engineer the warning signs, we narrowed it down to five questions. Not questions you ask the client — questions you ask yourself, about the client.",
      "Question 1: Has this client's communication pattern changed recently? This isn't about frequency. It's about the texture. Did they used to send voice notes and now it's one-line emails? Did they used to reply within an hour and now it's two days? The shift matters more than the baseline.",
      "Question 2: When was your last meaningful conversation? Not a status update. Not a Slack message about a deadline. A real conversation where you talked about the work, the relationship, or the future. If you have to think about it, it's been too long.",
      "Question 3: How honest is the feedback you're getting? Engaged clients push back. They challenge ideas, request changes, and have opinions. When feedback shifts from specific to vague — from \"can we try a different angle on the headline\" to \"looks good\" — something has changed.",
      "Question 4: Is there a conversation you've been putting off? This is the hardest one to answer honestly. If there's something you've been meaning to bring up but keep delaying, that avoidance is a signal. The conversation you're avoiding is usually the one that saves the relationship.",
      "Question 5: If they cancelled tomorrow, how would you feel? Not how you'd respond — how you'd feel. Surprised? Or would you think \"yeah, I could see that coming\"? Your gut knows before your brain admits it.",
      "These five questions form the foundation of every Health Check inside Retayned. They're uncomfortable by design. Because the truth about a client relationship is always available — most people just don't ask.",
    ]
  },
  {
    title: "What 50 lost clients taught us about communication velocity",
    desc: "When response times double, cancellation follows within 8 weeks.",
    tag: "Signals",
    readTime: "3 min",
    body: [
      "We went back through every client we'd lost over a decade of agency work and looked at one metric: how fast they responded to us in the months before they left versus the months before that.",
      "The pattern was impossible to ignore. In 42 out of 50 cases, the client's average response time at least doubled in the 8 weeks before they cancelled. Not gradually — there was usually a clear inflection point. One week they're replying same-day, the next week it's three days, and it never comes back.",
      "We call this communication velocity, and it's one of the strongest leading indicators of churn we've found.",
      "What makes velocity so useful is that it's objective. You don't have to interpret body language or read between the lines of an email. The data is right there in your inbox: timestamps don't lie.",
      "But here's the thing most people miss: velocity dropping doesn't always mean the client is unhappy with you. Sometimes they're drowning internally. Sometimes they got a new boss who's restructuring priorities. Sometimes it's a budget freeze and they don't know how to tell you yet.",
      "The signal isn't a diagnosis — it's a prompt. When velocity drops, that's your cue to reach out, not with a status update, but with a genuine question: \"I noticed we haven't connected as much lately. Everything good on your end?\"",
      "Retayned tracks velocity automatically by reading metadata from your connected communication channels — timestamps, not content. When a client's pattern shifts, you'll know before the pattern becomes permanent.",
    ]
  },
  {
    title: "How to have the conversation you're avoiding",
    desc: "The opening line matters more than you think. We break down the script.",
    tag: "AI Coach",
    readTime: "4 min",
    body: [
      "You know the conversation. The one you've been putting off for two weeks. Maybe the client's been distant. Maybe the scope is creeping and you haven't said anything. Maybe you know something is wrong and you're hoping it fixes itself.",
      "It won't. The longer you wait, the harder it gets — and the more likely the client fills the silence with their own narrative, which is always worse than reality.",
      "Here's the framework we use for every hard client conversation, and it's the same logic Rai uses when she writes you a script.",
      "Step 1: Lead with observation, not accusation. Don't say \"You've been unresponsive.\" Say \"I've noticed our communication has shifted over the last couple weeks.\" The first one makes them defensive. The second one opens a door.",
      "Step 2: Name the feeling without projecting. \"I want to make sure we're still aligned\" works better than \"I'm worried you're unhappy.\" You're acknowledging the tension without telling them how they feel.",
      "Step 3: Ask a question that requires a real answer. Not \"Is everything okay?\" — they'll say yes. Try: \"If you could change one thing about how we're working together, what would it be?\" That question is specific enough to force a genuine response.",
      "Step 4: Shut up. This is the hardest part. After you ask the real question, stop talking. Let the silence do its work. The client will fill it — and what they say next is the truth you've been missing.",
      "The conversation you're avoiding is almost never as bad as you think. And in our experience, having it early — even imperfectly — saves accounts that silence would have killed.",
    ]
  },
];

function BlogPosts() {
  const [expandedPost, setExpandedPost] = useState(null);

  if (expandedPost !== null) {
    const post = blogPostData[expandedPost];
    return (
      <div>
        <button onClick={() => setExpandedPost(null)} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: "pointer", fontFamily: "inherit", marginBottom: 20, padding: 0 }}>← Back to all posts</button>
        <div style={{ background: C.card, borderRadius: 16, padding: "32px 28px", border: "1px solid " + C.border, boxShadow: "0 8px 32px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", background: C.primarySoft, color: C.primary, borderRadius: 4 }}>{post.tag}</span>
            <span style={{ fontSize: 11, color: C.textMuted, padding: "3px 0" }}>{post.readTime} read</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 20 }}>{post.title}</h2>
          <div style={{ fontSize: 15, color: C.text, lineHeight: 1.75 }}>
            {post.body.map((p, i) => (
              <p key={i} style={{ marginBottom: 16 }}>{p}</p>
            ))}
          </div>
          <div style={{ marginTop: 28, padding: "24px 20px", background: C.primarySoft, borderRadius: 12, textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Want to catch these signals automatically?</p>
            <p style={{ fontSize: 13, color: C.textSec, marginBottom: 14 }}>Retayned monitors your client relationships and tells you when to act.</p>
            <button className="cta-btn" onClick={() => {}} style={{ padding: "12px 28px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
      {blogPostData.map((p, i) => (
        <div key={i} onClick={() => { setExpandedPost(i); window.scrollTo(0, 0); }} style={{ background: C.card, borderRadius: 16, padding: "26px 24px", border: "1.5px solid " + C.border, cursor: "pointer", flex: "1 1 280px", minWidth: 280, boxShadow: C.cardShadow, transition: "transform 0.25s ease, box-shadow 0.25s ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = C.cardShadow; }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", background: C.primarySoft, color: C.primary, borderRadius: 4 }}>{p.tag}</span>
            <span style={{ fontSize: 11, color: C.textMuted, padding: "3px 0" }}>{p.readTime} read</span>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{p.title}</h3>
          <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55 }}>{p.desc}</p>
          <div style={{ marginTop: 12, fontSize: 13, fontWeight: 600, color: C.btn }}>Read post</div>
        </div>
      ))}
    </div>
  );
}

// ═══ LEARN ═══
function Blog({ setPage }) {
  const [activeModule, setActiveModule] = useState(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sliderVals, setSliderVals] = useState({});

  const reset = () => { setActiveModule(null); setStep(0); setAnswers({}); setEmail(""); setName(""); setSubmitted(false); setSliderVals({}); };

  useEffect(() => { if (activeModule) window.scrollTo(0, 0); }, [step, activeModule]);

  const modules = [
    { emoji: "🩺", id: "health", title: "Retention Health Check", desc: "Think of one client. Answer five questions honestly. Get a retention score and know what to do next.", time: "60 sec", tag: "Assessment" },
    { emoji: "💰", id: "calculator", title: "The Retention Calculator", desc: "See what client churn is actually costing you. The number is always bigger than you think.", time: "30 sec", tag: "Calculator" },
    { emoji: "👤", id: "profile", title: "Grade Your Client Relationship", desc: "Score one client across 12 relationship dimensions. See where the cracks are.", time: "2 min", tag: "Assessment" },
    { emoji: "🎭", id: "simulator", title: "The Hard Conversation Simulator", desc: "Five scenarios. Three approaches each. See how your instincts play out.", time: "4 min", tag: "Simulator" },
  ];

  // ── Health Check data ──
  const hcQuestions = [
    { q: "Has this client's communication pattern changed recently?", opts: [{ t: "Same as always — no shift in how we talk", s: 10 }, { t: "Slightly different but could be nothing", s: 8 }, { t: "Noticeably different from normal", s: 3 }, { t: "Something has clearly changed", s: 1 }] },
    { q: "When was your last meaningful conversation?", opts: [{ t: "This week — we're in a good rhythm", s: 10 }, { t: "Within 2 weeks — normal for us", s: 8 }, { t: "It's been a while — longer than usual", s: 4 }, { t: "It's been 84 years...", s: 1 }] },
    { q: "How honest is the feedback you're getting?", opts: [{ t: "Same as always — they engage the way they always have", s: 10 }, { t: "Slightly less engaged than normal", s: 8 }, { t: "Noticeably pulled back from how they used to be", s: 4 }, { t: "Little to no feedback at all — and that's new", s: 1 }] },
    { q: "Is there a conversation you've been putting off?", opts: [{ t: "No — we're aligned and I feel good about it", s: 10 }, { t: "Something small I should probably mention", s: 8 }, { t: "Something real that's been on my mind", s: 4 }, { t: "Yes — and the longer I wait the harder it gets", s: 1 }] },
    { q: "If they cancelled tomorrow, how would you feel?", opts: [{ t: "Surprised. Unexpected for sure.", s: 10 }, { t: "Surprised but I could see it if I'm honest", s: 6 }, { t: "Not that surprised", s: 3 }, { t: "I've had the thought myself", s: 1 }] },
  ];

  // ── Signals Quiz data ──
  const signalQuestions = [
    { msg: "\"Hey, just looping in my colleague Dana on this thread. She'll be taking point on a few things.\"", opts: ["Delegation — they trust you more", "New stakeholder — potential risk", "They're stepping back from the relationship", "Normal team expansion"], correct: 2, explain: "When your main contact starts handing off to someone else without context, it often means they're creating distance. The relationship is cooling before the contract does." },
    { msg: "\"All good on our end! Nothing to flag this week.\"", opts: ["Everything is fine", "They're too busy to engage", "They've stopped caring enough to give feedback", "They're being polite before bad news"], correct: 2, explain: "Vague positivity with no specifics is one of the most missed churn signals. Engaged clients give details. Disengaging clients give you 'all good.'" },
    { msg: "\"Can you send over a summary of everything we've done this quarter? Just want to have it for my files.\"", opts: ["Normal record-keeping", "Preparing a case to show their boss", "Building a handoff document", "Wants to appreciate your work"], correct: 2, explain: "When a client asks for a comprehensive summary unprompted, they may be preparing to transition. This is a handoff document in disguise." },
    { msg: "\"We're going to hold off on the new campaign for now. Let's revisit next month.\"", opts: ["Budget timing issue", "Lost confidence in the strategy", "Testing if they miss you", "Normal business pause"], correct: 1, explain: "Indefinite delays often mean the client has lost confidence but doesn't want confrontation. 'Next month' frequently becomes never. The conversation to have is now." },
    { msg: "\"I forwarded your last report to our CEO. She had some questions.\"", opts: ["Great — executive visibility", "Your work is being scrutinized", "The CEO is considering alternatives", "They want you to impress leadership"], correct: 1, explain: "Reports getting escalated to leadership without a heads-up often means your work is under review. It could be positive, but more often it means someone questioned the value." },
  ];

  // ── Simulator data ──
  const raiNudge = " The truth is, by the time response times have doubled and meetings are slipping, you're playing catch-up. The A play was having this conversation weeks ago when the first signal appeared. Want help spotting those earlier? Talk to Rai.";
  const simScenarios = [
    { title: "The New Stakeholder", setup: "Your main contact Mike just told you his new boss wants to \"review all vendor relationships.\" Mike says not to worry. What do you do?",
      opts: [
        { label: "Ask for an intro to Mike's new boss to set the tone directly", desc: "\"Mike, we'd really like to speak to your new boss to make sure he sees our value..\"", outcome: "If Mike is protective of the relationship, you just undermined your biggest advocate. If you are already providing value, the new boss will likely see it regardless. Rai can help diagnose situations like this.", score: "C" },
        { label: "Ask Mike how he'd like to handle it together", desc: "\"I trust your read on this. How do you want to play it — should I put something together for you, or would it help if I met them directly?\"", outcome: "You're respecting Mike's position while giving him options. He knows whether an intro helps or hurts.", score: "A" },
        { label: "Trust Mike and wait it out", desc: "He knows the internal dynamics better than you.", outcome: "This can work — if Mike has real influence and a strong relationship with the new boss. But you're betting your contract on someone else's political capital without knowing how much they have.", score: "B" },
      ]},
    { title: "The Vague Feedback Shift", setup: "Your client Ally used to give detailed, specific feedback on every deliverable. For the last three rounds, it's been \"looks good\" and nothing else. What do you do?",
      opts: [
        { label: "Send a longer-form review request or survey", desc: "A formal feedback form covering satisfaction, communication, and goals.", outcome: "Formality when the relationship has been informal signals that you know something is wrong. It also gives her an easy out — she'll check all the positive boxes and you'll learn nothing.", score: "C" },
        { label: "Enjoy the easy approval and move on", desc: "Less revision means more efficiency. Maybe she just trusts you now.", outcome: "Vague positivity is one of the most missed churn signals. Engaged clients give details. Disengaging clients say \"looks good.\"", score: "D" },
        { label: "Ask a specific question that forces a real answer", desc: "\"Ally, on the last campaign — was the creative direction what you had in mind, or would you have gone a different way?\"", outcome: "You're not asking, \"Is everything okay?\" — you're making it easy for her to give you something real without it feeling like a confrontation.", score: "A" },
      ]},
    { title: "The Budget Conversation", setup: "Your client James casually mentions they're \"tightening budgets across the board this quarter.\" He hasn't said anything about your contract specifically. What do you do?",
      opts: [
        { label: "Proactively propose a restructured package", desc: "\"James, I heard you on the budget pressure. Here's what I'd suggest if we need to adjust — these are the highest-impact pieces I'd protect.\"", outcome: "You're showing you listened, you're flexible, and you're strategic. Clients cut vendors who seem rigid first.", score: "A" },
        { label: "Wait to see if it affects you", desc: "He didn't mention your contract. No need to bring it up and plant ideas.", outcome: "You're hoping the problem doesn't find you. It usually does — and by then you've lost the chance to shape the conversation.", score: "C" },
        { label: "Ask directly if your contract is at risk", desc: "\"James, should I be worried about our engagement?\"", outcome: "Direct, but it puts him in an awkward position and frames you as a cost to defend rather than a partner solving a problem.", score: "C" },
      ]},
    { title: "The Competitor Mention", setup: "During a call, your client Priya casually says \"we've been getting pitched by a few other agencies lately.\" She laughs it off. What do you do?",
      opts: [
        { label: "Laugh it off too and change the subject", desc: "She brought it up casually, so it's probably nothing. Don't make it weird.", outcome: "She told you for a reason. Clients don't mention competitors by accident. This was either a test or a warning — either way, ignoring it is the worst response.", score: "D" },
        { label: "Immediately pitch new ideas to prove your value", desc: "Launch into everything new you've been thinking about to remind her why she hired you.", outcome: "Reactive and transparent. She'll see through it — and it signals insecurity rather than confidence.", score: "C" },
        { label: "Match her energy with confidence", desc: "\"Of course you are! You're a great client. I'd be worried if they weren't calling you.\"", outcome: "No panic, no defensiveness. You're reminding her she's valuable and you're not threatened. Confidence is the most underrated retention tool.", score: "A" },
      ]},
    { title: "The Slow Fade", setup: "Your client Sarah used to respond within hours. Now it takes days. Meetings keep getting rescheduled. The work quality hasn't changed. What do you do?",
      opts: [
        { label: "Name the pattern directly", desc: "\"Sarah, I've noticed our rhythm has shifted. I want to make sure I'm still delivering what matters most to you.\"", outcome: "This is the right instinct and it may still work." + raiNudge, score: "B" },
        { label: "Send a check-in email", desc: "\"Hey Sarah, just checking in — everything okay on your end?\"", outcome: "She'll say \"All good!\" and the fade continues. You've confirmed nothing and changed nothing." + raiNudge, score: "C" },
        { label: "Increase deliverables to prove value", desc: "Send an extra report, add a new initiative, work harder.", outcome: "More output doesn't fix a relationship problem. You're solving the wrong thing and burning resources." + raiNudge, score: "D" },
      ]},
  ];

  // ── Autopsy data ──
  const autopsyQuestions = [
    { q: "How did communication change in the last 3 months?", opts: ["Got quieter over time", "Shifted to someone else", "Became more formal/transactional", "Didn't change — it was sudden"] },
    { q: "What was the stated reason for leaving?", opts: ["Budget cuts", "Going in a different direction", "Hired in-house", "Performance concerns", "No real explanation given"] },
    { q: "Were there signs you ignored?", opts: ["Delayed responses", "Vague feedback", "Scope reduction", "Meetings cancelled", "I honestly didn't see any"] },
    { q: "How was the relationship at a personal level?", opts: ["Strictly business — always was", "Used to be warm, cooled off", "Warm until the end", "Never really connected"] },
    { q: "Did you have the hard conversation?", opts: ["Yes, early on", "Yes, but too late", "No — I avoided it", "There was no conversation to have"] },
    { q: "Would they refer you today?", opts: ["Definitely yes", "Probably yes", "Probably not", "Definitely not", "No idea"] },
  ];

  const autopsyPatterns = {
    "Silence Spiral": { match: (a) => a[0] === 0 && (a[2] === 0 || a[2] === 1) && a[4] !== 0, desc: "Communication faded gradually. The signals were there — you just didn't act on them. This is the most common and most preventable pattern." },
    "Expectation Gap": { match: (a) => a[1] === 3 && (a[3] === 0 || a[3] === 3), desc: "They expected something different than what they got. Not worse — different. This is a profiling problem, not a performance problem." },
    "Decision-Maker Shift": { match: (a) => a[0] === 1, desc: "Your champion left or lost influence. The new person didn't inherit the relationship. Without re-establishing trust with the new stakeholder, the contract follows the person, not the company." },
    "Avoidance Loop": { match: (a) => a[4] === 2, desc: "You knew something was wrong and didn't address it. The conversation you avoided was the one that could have saved the account." },
    "Sudden Exit": { match: (a) => a[0] === 3 && a[2] === 4, desc: "No visible warning signs. This usually means the decision happened above your contact's level, or the signals were in channels you weren't monitoring." },
  };

  // ── Profile dimensions ──
  const profileDims = [
    { key: "commFreq", name: "Communication Frequency", left: "Rarely", right: "Constantly" },
    { key: "commTone", name: "Communication Tone", left: "Reserved", right: "Direct" },
    { key: "trustLevel", name: "Trust Level", left: "Hands-on", right: "Delegated" },
    { key: "decisionSpeed", name: "Decision Speed", left: "Deliberate", right: "Immediate" },
    { key: "feedbackStyle", name: "Feedback Style", left: "Indirect", right: "Blunt" },
    { key: "metricFocus", name: "Metric Focus", left: "Gut feel", right: "Data-driven" },
    { key: "expectLevel", name: "Expectation Level", left: "Conservative", right: "Aggressive" },
    { key: "reportNeed", name: "Reporting Need", left: "Hands-off", right: "Everything" },
    { key: "stressResponse", name: "Stress Response", left: "Goes quiet", right: "Gets loud" },
    { key: "changeAppetite", name: "Change Appetite", left: "Stable", right: "Experimenting" },
    { key: "loyaltySignal", name: "Loyalty Signal", left: "Shopping around", right: "Locked in" },
    { key: "relationDepth", name: "Relationship Depth", left: "Business", right: "Personal" },
  ];

  // ── Shared email gate ──
  const EmailGate = ({ title }) => (
    <div style={{ background: C.heroGrad, borderRadius: 14, padding: "28px 24px", color: "#fff", textAlign: "center" }}>
      {!submitted ? (
        <>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{title || "Want help before your next tough convo?"}</div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Start your 14-day free trial. Cancel anytime.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} />
            <button onClick={() => { if (email.includes("@")) setSubmitted(true); }} className="cta-btn" style={{ width: "100%", padding: "12px 20px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Try Free Now</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>You're in.</div>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)" }}>You're on the list. We'll be in touch soon.</p>
        </>
      )}
    </div>
  );

  const Opt = ({ text, selected, onClick }) => (
    <div onClick={onClick} style={{ padding: "12px 16px", borderRadius: 10, cursor: "pointer", background: selected ? C.primarySoft : C.bg, border: "1.5px solid " + (selected ? C.primary : C.borderLight), fontSize: 14, color: selected ? C.primary : C.textSec, fontWeight: selected ? 600 : 400, transition: "all 0.15s" }}>{text}</div>
  );

  const BackBtn = ({ onClick }) => <button onClick={onClick} style={{ padding: "8px 16px", background: C.surface, color: C.textSec, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>← Back</button>;
  const NextBtn = ({ onClick, disabled, label }) => <button onClick={onClick} style={{ padding: "8px 20px", background: disabled ? C.surface : C.btn, color: disabled ? C.textMuted : "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", fontFamily: "inherit" }}>{label || "Next"}</button>;

  // ── MODULE RENDERERS ──

  const renderHealth = () => {
    const total = hcQuestions.length;
    if (step < total) {
      const q = hcQuestions[step];
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => <Opt key={i} text={o.t} selected={answers[step] === i} onClick={() => { setAnswers({ ...answers, [step]: i }); setTimeout(() => setStep(step + 1), 300); }} />)}
          </div>
          {step > 0 && <div style={{ marginTop: 14 }}><BackBtn onClick={() => setStep(step - 1)} /></div>}
        </div>
      );
    }
    const score = Math.round(hcQuestions.reduce((a, q, i) => a + q.opts[answers[i]]?.s, 0) / 50 * 100);
    const label = score >= 90 ? "Thriving" : score >= 80 ? "Healthy" : score >= 70 ? "Check In" : score >= 60 ? "Attention Needed" : score >= 50 ? "Watch Closely" : score >= 40 ? "At Risk" : score >= 30 ? "Serious" : score >= 20 ? "Critical" : "Emergency";
    const color = score >= 70 ? C.success : score >= 50 ? C.warning : C.danger;
    const msg = score >= 90 ? "This relationship is strong. Keep showing up the way you have been. Great work!"
      : score >= 80 ? "Healthy. Nothing urgent that stands out, but don't coast — momentum is easier to keep than rebuild."
      : score >= 70 ? "Nothing alarming, but worth considering what you can do slightly differently to improve this engagement."
      : score >= 60 ? "Something is off. You seem to sense it. Think through what's changed and how you can address any new variables. We recommend reviewing with Rai."
      : score >= 50 ? "There's a pattern forming here. Multiple signals suggest this isn't a one-off rough patch. We recommend having an honest conversation soon. Speak with Rai."
      : score >= 40 ? "Several things need attention and they're compounding. The longer you wait, the harder each one gets to fix. Speak with Rai before this escalates."
      : score >= 30 ? "This client relationship has serious, overlapping problems. We strongly recommend building a retention gameplan with Rai today. Not this week — today."
      : score >= 20 ? "This relationship has deep fractures on multiple fronts. If there's a path back, it requires a direct, honest conversation immediately. Speak with Rai and prepare for either outcome."
      : "There's no way to sugarcoat this one. It's time to decide: is a last effort worth it, or is it time for the Rolodex? If things are ending, a graceful exit can still pave the way for referrals and future business.";
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color, letterSpacing: "-0.04em" }}>{score}%</div>
          <div style={{ fontSize: 18, fontWeight: 700, color }}>{label}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>{msg}</p>
        </div>
        <EmailGate title="You know the score. Now get the fix." />
      </div>
    );
  };

  const renderSignals = () => {
    const total = signalQuestions.length;
    if (step < total) {
      const q = signalQuestions[step];
      const picked = answers[step];
      const revealed = picked !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>Message {step + 1} of {total}</p>
          <div style={{ background: C.surface, borderRadius: 10, padding: "16px 18px", marginBottom: 14, borderLeft: "3px solid " + C.primary }}>
            <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.5 }}>{q.msg}</p>
          </div>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>What's the hidden signal?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => (
              <div key={i} onClick={() => !revealed && setAnswers({ ...answers, [step]: i })} style={{ padding: "12px 16px", borderRadius: 10, cursor: revealed ? "default" : "pointer", background: revealed ? (i === q.correct ? C.primarySoft : picked === i ? "#FAE8E4" : C.bg) : C.bg, border: "1.5px solid " + (revealed ? (i === q.correct ? C.primary : picked === i ? C.danger : C.borderLight) : C.borderLight), fontSize: 14, color: revealed ? (i === q.correct ? C.primary : picked === i ? C.danger : C.textMuted) : C.textSec, fontWeight: revealed && i === q.correct ? 700 : 400 }}>
                {revealed && i === q.correct && "✓ "}{revealed && picked === i && i !== q.correct && "✗ "}{o}
              </div>
            ))}
          </div>
          {revealed && (
            <div style={{ background: C.heroGrad, borderRadius: 10, padding: "14px 16px", color: "#fff", marginTop: 14 }}>
              <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.7)" }}>{q.explain}</p>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            {revealed && <NextBtn onClick={() => setStep(step + 1)} label={step < total - 1 ? "Next" : "See Results"} />}
          </div>
        </div>
      );
    }
    const correct = signalQuestions.filter((q, i) => answers[i] === q.correct).length;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color: correct >= 4 ? C.success : correct >= 2 ? C.warning : C.danger, letterSpacing: "-0.04em" }}>{correct}/{total}</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{correct >= 4 ? "Sharp instincts." : correct >= 2 ? "Room to sharpen." : "Most people miss these."}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>These are real signals from real client relationships. The ones you miss are the ones that cost you.</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderCalculator = () => {
    const clients = parseInt(answers.clients) || 0;
    const avgRev = parseInt(answers.avgRev) || 0;
    const churnPct = parseInt(answers.churnPct) || 0;
    const calculated = clients > 0 && avgRev > 0 && churnPct > 0;
    const annualLoss = Math.round(clients * (churnPct / 100) * avgRev * 12);
    const fivePctImprove = Math.round(annualLoss * 0.05 * 20);
    return (
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>How many active clients do you have?</label>
            <input type="number" value={answers.clients || ""} onChange={e => setAnswers({ ...answers, clients: e.target.value })} placeholder="e.g. 12" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Average monthly revenue per client ($)</label>
            <input type="number" value={answers.avgRev || ""} onChange={e => setAnswers({ ...answers, avgRev: e.target.value })} placeholder="e.g. 4000" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>What % of clients do you lose per year?</label>
            <input type="number" value={answers.churnPct || ""} onChange={e => setAnswers({ ...answers, churnPct: e.target.value })} placeholder="e.g. 20" style={{ width: "100%", padding: "12px 14px", border: "1.5px solid " + C.border, borderRadius: 10, fontSize: 15, fontFamily: "inherit", outline: "none", background: C.bg, boxSizing: "border-box" }} />
          </div>
        </div>
        {calculated && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ background: "#FAE8E4", borderRadius: 14, padding: "24px", border: "1px solid " + C.danger + "44", textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>You're losing</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.danger, letterSpacing: "-0.03em" }}>${annualLoss.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: C.danger }}>per year to client churn</div>
            </div>
            <div style={{ background: C.primarySoft, borderRadius: 14, padding: "24px", border: "1px solid " + C.primary + "44", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 6 }}>A 5% retention improvement =</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.primary, letterSpacing: "-0.03em" }}>+${fivePctImprove.toLocaleString()}</div>
              <div style={{ fontSize: 14, color: C.primary }}>in profit impact (at 95% margin on retained revenue)</div>
            </div>
          </div>
        )}
        {calculated && <EmailGate title="Ready to reduce your churn?" />}
      </div>
    );
  };

  const renderProfile = () => {
    const total = profileDims.length;
    if (step < total) {
      const dim = profileDims[step];
      const val = sliderVals[dim.key];
      const hasVal = val !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>{profileDims.map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{dim.name}</p>
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: hasVal ? C.primary : C.borderLight }}>{hasVal ? val : "—"}</span>
          </div>
          <div style={{ padding: "0 4px", marginBottom: 6 }}>
            <input type="range" min="0" max="10" value={hasVal ? val : 5} onChange={e => setSliderVals({ ...sliderVals, [dim.key]: parseInt(e.target.value) })} style={{ width: "100%", height: 6, appearance: "none", WebkitAppearance: "none", background: `linear-gradient(to right, ${C.border} 0%, ${C.primary} 100%)`, borderRadius: 3, outline: "none", cursor: "pointer" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 14 }}>
            <span>{dim.left}</span><span>{dim.right}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            <NextBtn onClick={() => hasVal && setStep(step + 1)} disabled={!hasVal} label={step < total - 1 ? "Next" : "See Profile"} />
          </div>
        </div>
      );
    }
    const loyalty = (sliderVals.loyaltySignal || 5) / 10;
    const trust = (sliderVals.trustLevel || 5) / 10;
    const baseline = Math.round((loyalty * 0.30 + trust * 0.20 + 0.50) * 100);
    const label = baseline >= 75 ? "Strong" : baseline >= 55 ? "Stable" : baseline >= 35 ? "Watch" : "At Risk";
    const color = baseline >= 75 ? C.success : baseline >= 55 ? C.warning : C.danger;
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 900, color, letterSpacing: "-0.04em" }}>{baseline}%</div>
          <div style={{ fontSize: 18, fontWeight: 700, color }}>{label}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 20 }}>
          {profileDims.map(d => (
            <div key={d.key} style={{ display: "flex", justifyContent: "space-between", padding: "8px 10px", background: C.bg, borderRadius: 8, fontSize: 12 }}>
              <span style={{ color: C.textSec }}>{d.name}</span>
              <span style={{ fontWeight: 700, color: C.primary }}>{sliderVals[d.key]}</span>
            </div>
          ))}
        </div>
        <EmailGate title="Want to level up your client relationships?" />
      </div>
    );
  };

  const renderSimulator = () => {
    const total = simScenarios.length;
    if (step < total) {
      const s = simScenarios[step];
      const picked = answers[step];
      const revealed = picked !== undefined;
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>Scenario {step + 1} of {total}</p>
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.title}</p>
          <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55, marginBottom: 16 }}>{s.setup}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {s.opts.map((o, i) => (
              <div key={i} onClick={() => !revealed && setAnswers({ ...answers, [step]: i })} style={{ padding: "14px 16px", borderRadius: 10, cursor: revealed ? "default" : "pointer", background: revealed && picked === i ? (o.score === "A" ? C.primarySoft : o.score === "B" ? "#FBF2DC" : "#FAE8E4") : C.bg, border: "1.5px solid " + (revealed && picked === i ? (o.score === "A" ? C.primary : o.score === "B" ? C.warning : C.danger) : C.borderLight) }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{o.label}</div>
                <div style={{ fontSize: 13, color: C.textSec, fontStyle: "italic" }}>{o.desc}</div>
                {revealed && picked === i && (
                  <div style={{ marginTop: 10, padding: "10px 12px", background: "rgba(0,0,0,0.03)", borderRadius: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Grade: {o.score}</div>
                    <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{o.outcome}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14 }}>
            {step > 0 ? <BackBtn onClick={() => setStep(step - 1)} /> : <div />}
            {revealed && <NextBtn onClick={() => setStep(step + 1)} label={step < total - 1 ? "Next" : "See Results"} />}
          </div>
        </div>
      );
    }
    const grades = simScenarios.map((s, i) => s.opts[answers[i]]?.score || "?");
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
            {grades.map((g, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 12, background: g === "A" ? C.primarySoft : g === "B" ? "#FBF2DC" : "#FAE8E4", border: "2px solid " + (g === "A" ? C.primary : g === "B" ? C.warning : C.danger), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: g === "A" ? C.primary : g === "B" ? C.warning : C.danger }}>{g}</div>
            ))}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{grades.filter(g => g === "A").length >= 3 ? "Strong conversational instincts." : "Most people avoid these conversations entirely."}</div>
          <p style={{ fontSize: 14, color: C.textSec, marginTop: 8 }}>The right words at the right time save accounts. The wrong ones — or no words at all — lose them.</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderAutopsy = () => {
    const total = autopsyQuestions.length;
    if (step < total) {
      const q = autopsyQuestions[step];
      return (
        <div>
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? C.primary : C.borderLight }} />)}</div>
          <p style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{step + 1} of {total}</p>
          <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {q.opts.map((o, i) => <Opt key={i} text={o} selected={answers[step] === i} onClick={() => { setAnswers({ ...answers, [step]: i }); setTimeout(() => setStep(step + 1), 300); }} />)}
          </div>
          {step > 0 && <div style={{ marginTop: 14 }}><BackBtn onClick={() => setStep(step - 1)} /></div>}
        </div>
      );
    }
    const ans = Array.from({ length: total }, (_, i) => answers[i] || 0);
    const matched = Object.entries(autopsyPatterns).find(([_, p]) => p.match(ans));
    const pattern = matched || ["Mixed Signals", { desc: "Your situation combines multiple patterns. This is common — most client losses aren't clean. The key is identifying which signal came first and working backward." }];
    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🪦</div>
          <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>{pattern[0]}</div>
        </div>
        <div style={{ background: C.bg, borderRadius: 14, padding: "20px", marginBottom: 20 }}>
          <p style={{ fontSize: 15, color: C.text, lineHeight: 1.6 }}>{pattern[1].desc}</p>
        </div>
        <EmailGate />
      </div>
    );
  };

  const renderers = { health: renderHealth, calculator: renderCalculator, profile: renderProfile, simulator: renderSimulator };

  return (
    <>
      <section style={{ padding: "48px 20px 40px" }}>
        <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 10 }}>Resources</h1>
        <p style={{ fontSize: 17, color: C.textSec, marginBottom: 32, lineHeight: 1.6 }}>Interactive tools to sharpen your retention instincts. Free. No sign-up required.</p>

        {!activeModule ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {modules.map((m, i) => (
              <div key={i} onClick={() => { reset(); setActiveModule(m.id); window.scrollTo(0, 0); }} style={{ background: C.card, borderRadius: 16, padding: "26px 24px", border: "1.5px solid " + C.border, cursor: "pointer", flex: "1 1 280px", minWidth: 280, boxShadow: C.cardShadow, transition: "transform 0.25s ease, box-shadow 0.25s ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }} onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = C.cardShadow; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ fontSize: 32 }}>{m.emoji}</span>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: C.primarySoft, color: C.primary, borderRadius: 4 }}>{m.tag}</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", background: C.surface, color: C.textMuted, borderRadius: 4 }}>{m.time}</span>
                  </div>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{m.title}</h2>
                <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.55 }}>{m.desc}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: C.btn }}>Start</div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ }}>
            <button onClick={reset} style={{ background: "none", border: "none", fontSize: 13, fontWeight: 600, color: C.textMuted, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, padding: 0 }}>← Back to all tools</button>
            <div style={{ background: C.card, borderRadius: 14, padding: "28px 24px", border: "1.5px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 28 }}>{modules.find(m => m.id === activeModule)?.emoji}</span>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{modules.find(m => m.id === activeModule)?.title}</h2>
              </div>
              {renderers[activeModule]?.()}
            </div>
          </div>
        )}
      </section>

      {/* Blog Posts */}
      <section style={{ padding: "0 20px 48px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>From the Blog</h2>
        <BlogPosts />
      </section>

      {/* Subscribe */}
      <div className="r-full-bleed" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`, padding: "140px 20px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <div style={{ position: "relative", zIndex: 2, paddingBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12, color: "#fff" }}>Get notified when we publish!</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
            <input style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.25)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} placeholder="you@agency.com" />
            <button className="cta-btn" style={{ width: "100%", padding: "12px 20px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
          </div>
        </div>
        <InlineFooter setPage={setPage} />
      </div>
    </>
  );
}
// ═══ DEMO ═══
function Demo() {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Get a Demo</h1>
      <p style={{ fontSize: 17, color: C.textSec, marginBottom: 32, lineHeight: 1.6 }}>Get a prerecorded demo of the Retayned platform!</p>
      <div style={{ background: C.card, borderRadius: 16, padding: "28px 24px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label><input style={inputStyle} placeholder="Your name" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="you@agency.com" type="email" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Message</label><textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="What parts of the platform do you want to see? What features are you most interested in?" /></div>
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Send Me the Demo</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {[["Email", "hello@retayned.com"], ["Based in", "Washington, DC"], ["Response time", "Usually within a few hours"]].map(([l, v], i) => (
          <div key={i} style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 14, color: C.textSec }}>{v}</div></div>
        ))}
      </div>
    </section>
  );
}
// ═══ CONTACT ═══
function Contact() {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Get in Touch</h1>
      <p style={{ fontSize: 17, color: C.textSec, marginBottom: 32, lineHeight: 1.6 }}>Questions, feedback, partnerships, or just want to talk retention.</p>
      <div style={{ background: C.card, borderRadius: 16, padding: "28px 24px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Name</label><input style={inputStyle} placeholder="Your name" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="you@agency.com" type="email" /></div>
          <div><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Message</label><textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} placeholder="What's on your mind?" /></div>
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Send Message</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
        {[["Email", "hello@retayned.com"], ["Based in", "Washington, DC"], ["Response time", "Usually within a few hours"]].map(([l, v], i) => (
          <div key={i} style={{ background: C.card, borderRadius: 12, padding: "16px 20px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{l}</div><div style={{ fontSize: 14, color: C.textSec }}>{v}</div></div>
        ))}
      </div>
    </section>
  );
}

// ═══ LOGIN ═══
function Login({ setPage }) {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: 32 }}>
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "32px 24px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Welcome back.</h1>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>Sign in to your account.</p>
        <button style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid " + C.border, background: C.card, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: C.text, marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMuted }}>or</span><div style={{ flex: 1, height: 1, background: C.borderLight }} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Email" type="email" />
          <input style={inputStyle} placeholder="Password" type="password" />
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Sign In</button>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16 }}>Don't have an account? <span onClick={() => setPage("signup")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Start free trial</span></p>
      </div>
    </section>
  );
}

// ═══ SIGNUP ═══
function Signup({ setPage }) {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", marginBottom: 32 }}>
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary, fontFamily: "system-ui, -apple-system, sans-serif" }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1, fontFamily: "system-ui, -apple-system, sans-serif" }}>.</span>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "32px 24px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Start your free trial.</h1>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>14-day free trial. Cancel anytime.</p>
        <button style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: "1.5px solid " + C.border, background: C.card, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: C.text, marginBottom: 20 }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Sign up with Google
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}><div style={{ flex: 1, height: 1, background: C.borderLight }} /><span style={{ fontSize: 12, color: C.textMuted }}>or</span><div style={{ flex: 1, height: 1, background: C.borderLight }} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input style={inputStyle} placeholder="Full name" />
          <input style={inputStyle} placeholder="Email" type="email" />
          <input style={inputStyle} placeholder="Password" type="password" />
          <button className="cta-btn" style={{ width: "100%", padding: "14px 20px", background: C.btn, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
        </div>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 16 }}>Already have an account? <span onClick={() => setPage("login")} style={{ color: C.primary, fontWeight: 600, cursor: "pointer" }}>Sign in</span></p>
      </div>
    </section>
  );
}

// ═══ FAQ Component (shared) ═══
const faqGroups = [
  {
    label: "About Retayned",
    questions: [
      { q: "What is Retayned?", a: "Retayned is a new client relationship management platform built for agencies, freelancers, consultants, stylists, coaches...anyone who manages ongoing client relationships. It combines AI-powered retention scoring with communication signal tracking and 10+ years of proprietary client retention data and expertise. Retayned doesn't just tell you which clients need attention — it gives you the exact action steps and script to turn a potential loss into lifelong business." },
      { q: "How is this different from a CRM?", a: "Traditional CRMs track deals and contacts. Retayned tracks the health of relationships. It profiles how each client communicates, monitors engagement velocity across your channels, and uses AI to predict churn well before it happens. A CRM tells you who your clients are. Retayned tells you how your clients are feeling and what to do to make things better." },
      { q: "What does the AI actually do?", a: "Rai ingests several inputs — relationship profiles, health checks, velocity signals, deliverable tracking, billing, and more — then generates personalized action points. It tells you who to talk to today, what the real problem is, and gives you an opening to delight your clients." },
      { q: "Who is this built for?", a: "Anyone who manages one or more ongoing client relationships. Agency owners, freelancers, consultants, stylists, coaches, account managers. If losing a client changes your month, quarter, or year, Retayned is for you." },
    ]
  },
  {
    label: "Pricing & Plans",
    questions: [
      { q: "What does it cost?", a: "It couldn't be simpler. $19.99/mo plus $1 per client. One plan, every feature, no tiers. Whether you have 3 clients or 300, you get the full platform — unlimited Rai chats, dynamic scoring, health checks, integrations, team members, everything. Enterprise pricing is available for teams building AI agents. Every plan includes a 14-day free trial." },
    ]
  },
  {
    label: "Getting Started",
    questions: [
      { q: "Do I need to connect my email or Slack?", a: "Nope. The core platform — profiles, health checks, AI coaching, and deliverable tracking — works without any integrations. Channel connections unlock additional velocity detection and automated signals, but you can start without them and add integrations when you're ready." },
      { q: "How long does setup take?", a: "Minutes. Add your clients, score their relationship profiles, and you're in. The AI starts generating insights immediately. Connect every channel take a few clicks each when you're ready for them." },
      { q: "Is my client data safe?", a: "Yes. We access communication metadata (timestamps, response frequency) — not message content. Your data is encrypted in transit and at rest, hosted on secure US infrastructure. We don't sell your data or use it to train AI models. You own everything you put in." },
    ]
  }
];

function FAQ({ fullBleed }) {
  const [openQ, setOpenQ] = useState(null);
  return (
    <div>
      {faqGroups.map((group, gi) => (
        <div key={gi} style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: C.primary }}>{group.label}</span>
          </div>
          {group.questions.map((faq, qi) => {
            const key = `${gi}-${qi}`;
            const isOpen = openQ === key;
            return (
              <div key={key} onClick={() => setOpenQ(isOpen ? null : key)} style={{
                background: isOpen ? (fullBleed ? C.card : C.primarySoft) : "transparent",
                borderTop: "1px solid rgba(51,84,62,0.12)",
                borderBottom: qi === group.questions.length - 1 ? "1px solid rgba(51,84,62,0.12)" : "none",
                cursor: "pointer",
                transition: "background 0.2s ease",
                marginLeft: "calc(-50vw + 50%)",
                marginRight: "calc(-50vw + 50%)",
                paddingLeft: "calc(50vw - 50%)",
                paddingRight: "calc(50vw - 50%)",
                paddingTop: 16,
                paddingBottom: 16,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: isOpen ? 10 : 0, transition: "margin 0.2s" }}>{faq.q}</h3>
                {isOpen && (
                  <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.6 }}>{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ═══ FAQ Page ═══
function FAQPage({ setPage }) {
  return (
    <>
      <section style={{ padding: "56px 20px 48px" }}>
        <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 10 }}>Frequently Asked Questions</h1>
        <p style={{ fontSize: 17, color: C.textSec, marginBottom: 32, lineHeight: 1.6 }}>Everything you need to know about Retayned.</p>
        <FAQ />
      </section>
      <div className="r-full-bleed" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`, padding: "140px 20px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <div style={{ position: "relative", zIndex: 2, paddingBottom: 72 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, color: "#fff" }}>Still have questions?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 24 }}>We'd love to hear from you.</p>
          <button onClick={() => setPage("contact")} className="cta-btn" style={{ padding: "14px 32px", background: "#fff", color: C.btn, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Contact Us</button>
        </div>
        <InlineFooter setPage={setPage} />
      </div>
    </>
  );
}

// ═══ PRIVACY ═══
function Privacy() {
  const H = { color: C.text, fontSize: 17, fontWeight: 800, marginTop: 24, marginBottom: 10, letterSpacing: "-0.01em" };
  const P = { marginBottom: 10 };
  const LABEL = { color: C.text, fontWeight: 700 };
  return (
    <section style={{ padding: "56px 20px 48px", margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 24 }}>Privacy Policy</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 16 }}><strong style={LABEL}>Last updated:</strong> April 2026</p>
        <p style={P}>Retayned, operated by Maniac Digital, LLC ("Retayned," "we," "our," "us"), is committed to protecting the privacy of our users and the clients they manage through the Service. This Privacy Policy describes how we collect, use, store, and share information when you use the Retayned platform, website (retayned.com), and related services (collectively, the "Service").</p>
        <p style={P}>Retayned is designed for freelancers, consultants, and agencies to manage their relationships with their own clients. Because of this, the Service involves two distinct categories of people: (1) <strong style={LABEL}>Users</strong> — the account holders who subscribe to Retayned, and (2) <strong style={LABEL}>Clients</strong> — the third parties whose information Users enter into the Service. This policy explains how we handle data about both.</p>

        <h2 style={H}>1. Roles and Responsibilities</h2>
        <p style={P}><strong style={LABEL}>You are the controller of your Client Data.</strong> When you enter information about your clients into the Service, you act as the data controller for that information under applicable privacy laws (including GDPR, UK GDPR, and CCPA). Retayned acts as your data processor and processes Client Data solely on your behalf and according to your instructions as set out in these terms and our Data Processing Addendum.</p>
        <p style={P}><strong style={LABEL}>This means you are responsible for:</strong> having a lawful basis to collect and process your clients' information (typically legitimate interest for B2B client management, but this is your determination to make); providing any notices your clients are entitled to under applicable law; obtaining any consents required in your jurisdiction; and responding to requests from your clients to access, correct, or delete information about them.</p>
        <p style={P}><strong style={LABEL}>We will support you</strong> by providing tools to export, edit, and delete Client Data, and by routing any direct requests we receive from your clients to you for response. A Data Processing Addendum is available on request at privacy@retayned.com.</p>

        <h2 style={H}>2. Information We Collect</h2>
        <p style={P}><strong style={LABEL}>Account Information.</strong> When you register, we collect your name, email address, company name, and billing information. If you sign up via Google OAuth, we receive your name and email from Google. We do not store your Google password.</p>
        <p style={P}><strong style={LABEL}>Client Data.</strong> You enter information about your clients into the Service, including names, contact information, relationship profiles, health check responses, revenue and billing records, notes, logged touchpoints, and other client-related data ("Client Data"). You control what Client Data you provide.</p>
        <p style={P}><strong style={LABEL}>AI-Generated Data.</strong> The Service produces derived data about your clients, including retention scores, profile scores, archetype classifications, suggested daily actions, and conversation history with the Rai advisor ("AI-Generated Data"). This data is stored in association with the relevant client record.</p>
        <p style={P}><strong style={LABEL}>Integration Data (if and when enabled).</strong> Retayned may, in future versions of the Service or if you choose to connect them, offer integrations with third-party platforms such as Gmail, Google Calendar, or Slack. If you connect such an integration, we will access only the metadata necessary to calculate communication signals (timestamps, sender/recipient identifiers, meeting frequency, response latency). We would not read, store, or process the content of your emails, messages, or meeting transcripts. Integrations are opt-in and can be disconnected at any time. No integrations are enabled by default.</p>
        <p style={P}><strong style={LABEL}>Usage Data.</strong> We automatically collect information about how you interact with the Service, including pages viewed, features used, session duration, device type, browser type, IP address, and referring URLs.</p>
        <p style={P}><strong style={LABEL}>Cookies and Tracking.</strong> We use essential cookies to maintain your session and preferences, and analytics tools to understand usage patterns. We do not use third-party advertising cookies. You may disable non-essential cookies through your browser settings.</p>

        <h2 style={H}>3. How We Use Your Information</h2>
        <p style={P}>We use the information we collect to: provide, operate, and maintain the Service; generate retention scores, health assessments, and AI-powered recommendations through Rai; process payments and manage your subscription; send transactional communications (account confirmations, billing notices, security alerts); respond to support requests; and comply with legal obligations.</p>
        <p style={P}>We do not sell, rent, or lease your personal information or Client Data to third parties. We do not use your Client Data for advertising purposes.</p>

        <h2 style={H}>4. How Rai and AI Features Work</h2>
        <p style={P}><strong style={LABEL}>What Rai does.</strong> Rai is Retayned's AI advisor. When you interact with Rai or when the Daily Sweep runs, Client Data relevant to the request — relationship profiles, scores, recent notes, revenue data, and recent Rai conversation history — is sent to a third-party AI provider (currently Anthropic's Claude API) to generate recommendations, suggestions, and responses.</p>
        <p style={P}><strong style={LABEL}>Data minimization.</strong> We send only the Client Data necessary to generate a relevant response. We do not send your full account, your billing details, your credentials, or data about clients other than those relevant to the request.</p>
        <p style={P}><strong style={LABEL}>Zero retention at the AI provider.</strong> Our AI provider is contractually prohibited from retaining your Client Data beyond the duration of the API request and from using it for model training. We rely on Anthropic's zero-retention posture for API traffic.</p>
        <p style={P}><strong style={LABEL}>Rai conversations.</strong> When you chat with Rai about a specific client, the conversation is stored in Retayned so Rai can maintain context across sessions. Conversations are capped at a rolling window (currently 20 messages per client) and are stored against that client record. Individual messages are automatically purged 180 days after they are sent, on a rolling per-message basis, so Rai's context reflects only recent relationship history. You can delete a Rai conversation at any time from the client profile. Deleting a client deletes all associated Rai conversations and AI-Generated Data within 30 days.</p>
        <p style={P}><strong style={LABEL}>Daily Sweep outputs.</strong> Rai generates suggested tasks for your clients on a scheduled basis. These suggestions, along with whether you promoted or dismissed them, are stored as history to improve suggestion quality for you over time and to avoid repeating completed suggestions. This history is treated as Client Data and is deleted when the associated client is deleted.</p>
        <p style={P}><strong style={LABEL}>AI Outputs are not professional advice.</strong> Retention scores, suggestions, scripts, and Rai responses are informational. They do not constitute legal, financial, or business advice, and you should exercise your own judgment before acting on them.</p>

        <h2 style={H}>5. Use of Aggregated Data</h2>
        <p style={P}>We may use aggregated, de-identified patterns derived from Service usage to improve the Service — including refining scoring weights, archetype definitions, and suggestion quality. Aggregated data of this kind is stripped of identifiers that would allow it to be linked back to you, your clients, or any specific account, and is used in the aggregate only.</p>
        <p style={P}>We do not use your Client Data, your Rai conversations, or your AI-Generated Data to train, fine-tune, or improve any third-party AI or machine learning models. Our AI API providers are contractually prohibited from doing so.</p>

        <h2 style={H}>6. Data Sharing and Third Parties</h2>
        <p style={P}>We share information only in the following circumstances: with service providers who help us operate the Service, subject to contractual obligations to protect your data; with your consent or at your direction; to comply with applicable law, regulation, legal process, or governmental request; to protect the rights, safety, or property of Retayned, our users, or the public; and in connection with a merger, acquisition, or sale of assets, in which case you will be notified of any change in data practices.</p>
        <p style={P}><strong style={LABEL}>Categories of service providers we use:</strong> cloud hosting and infrastructure, payment processing, AI API providers, authentication, email delivery, and privacy-respecting analytics. All service providers are bound by data processing agreements that prohibit them from using your data for their own purposes. A current list of sub-processors is available on request at privacy@retayned.com.</p>

        <h2 style={H}>7. Data Security</h2>
        <p style={P}>We implement industry-standard security measures to protect your data, including: encryption of data in transit (TLS 1.2+) and at rest (AES-256); secure authentication with password hashing and optional OAuth; row-level access controls in our database limiting access between accounts; administrative access controls limiting employee access to production data; regular security reviews of our infrastructure and dependencies; and secure API communication with all third-party providers.</p>
        <p style={P}>No method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>
        <p style={P}><strong style={LABEL}>Breach notification.</strong> In the event of a data breach affecting your personal information or Client Data, we will notify affected Users without undue delay and, where required by applicable law, within the statutory timeframe (typically 72 hours under GDPR). Our notice will describe the nature of the breach, the categories and approximate number of records affected, likely consequences, and the steps we are taking to address it.</p>

        <h2 style={H}>8. Data Retention and Deletion</h2>
        <p style={P}><strong style={LABEL}>Active accounts.</strong> We retain Account Information, Client Data, and AI-Generated Data for as long as your account is active.</p>
        <p style={P}><strong style={LABEL}>Account cancellation.</strong> If you cancel your subscription, your data will be retained in an inactive state for 30 days to allow for reactivation, after which it will be permanently deleted within 90 days.</p>
        <p style={P}><strong style={LABEL}>Deleting a client.</strong> When you delete a client from your portfolio, all associated Client Data, AI-Generated Data, Rai conversations, and suggestion history for that client will be deleted within 30 days. Backups may retain deleted data for an additional period not to exceed 60 days, after which it is purged from backup media.</p>
        <p style={P}><strong style={LABEL}>Rai conversation messages.</strong> Individual Rai conversation messages are automatically deleted 180 days after they are sent, on a rolling per-message basis, regardless of whether the associated client is still in your portfolio.</p>
        <p style={P}><strong style={LABEL}>Immediate deletion.</strong> You may request immediate deletion of your account and all associated data at any time by contacting privacy@retayned.com.</p>
        <p style={P}><strong style={LABEL}>Legal retention.</strong> Certain data may be retained as required by law (for example, billing records for tax purposes) even after account deletion.</p>
        <p style={P}><strong style={LABEL}>Aggregated data.</strong> Aggregated, de-identified data that cannot be used to identify you or your clients may be retained indefinitely for product improvement purposes.</p>

        <h2 style={H}>9. Your Rights</h2>
        <p style={P}>Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal information; export your data in a portable format; restrict or object to certain processing; withdraw consent where processing is based on consent; and lodge a complaint with a supervisory authority.</p>
        <p style={P}>To exercise any of these rights regarding information about <strong style={LABEL}>you</strong> (as a User), contact us at privacy@retayned.com. We will respond within 30 days.</p>
        <p style={P}><strong style={LABEL}>Requests from your clients.</strong> If you are a third-party client (not a User) and you believe a Retayned User has entered information about you into the Service, please contact that User directly — they are the controller of information about you and are responsible for responding to your request. If you are unable to identify or reach the relevant User, you may contact us at privacy@retayned.com and we will make reasonable efforts to route your request to the appropriate User. We do not independently access, modify, or delete client records without instruction from the controlling User, except where required by law.</p>

        <h2 style={H}>10. International Data Transfers</h2>
        <p style={P}>Retayned is based in Washington, DC, United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States. By using the Service, you consent to the transfer of your information to the United States, where data protection laws may differ from those in your jurisdiction. For transfers from the EEA, UK, or Switzerland, we rely on Standard Contractual Clauses or equivalent safeguards as set out in our Data Processing Addendum.</p>

        <h2 style={H}>11. Children's Privacy</h2>
        <p style={P}>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.</p>

        <h2 style={H}>12. Enterprise and API Access</h2>
        <p style={P}>Retayned offers an Enterprise product with additional access surfaces, including a managed agent API. Enterprise customers are governed by a separate agreement that may include additional or modified data processing terms. The practices described in this policy apply to the self-serve Service unless superseded by an Enterprise agreement.</p>

        <h2 style={H}>13. Changes to This Policy</h2>
        <p style={P}>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the "Last updated" date, and, for material changes, by email or in-app notice. Your continued use of the Service after any changes constitutes acceptance of the updated policy.</p>

        <h2 style={H}>14. Contact Us</h2>
        <p style={P}>If you have questions about this Privacy Policy or our data practices, contact us at:</p>
        <p style={P}><strong style={LABEL}>privacy@retayned.com</strong><br />Maniac Digital, LLC<br />Washington, DC, United States</p>
      </div>
    </section>
  );
}

function Terms() {
  const H = { color: C.text, fontSize: 17, fontWeight: 800, marginTop: 24, marginBottom: 10, letterSpacing: "-0.01em" };
  const P = { marginBottom: 10 };
  const LABEL = { color: C.text, fontWeight: 700 };
  return (
    <section style={{ padding: "56px 20px 48px", margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 24 }}>Terms of Service</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 16 }}><strong style={LABEL}>Last updated:</strong> April 2026</p>
        <p style={P}>These Terms of Service ("Terms") govern your access to and use of the Retayned platform, website, and related services (collectively, the "Service") provided by Maniac Digital, LLC ("Retayned," "we," "our," "us"). By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>

        <h2 style={H}>1. Eligibility and Account</h2>
        <p style={P}>You must be at least 18 years old and have the legal authority to enter into these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
        <p style={P}>You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>

        <h2 style={H}>2. The Service</h2>
        <p style={P}>Retayned provides client relationship management tools including AI-powered retention scoring, communication signal analysis, health check assessments, suggested daily actions, a client relationship advisor ("Rai"), and related features. The Service is designed to help you manage and strengthen relationships with your own clients. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
        <p style={P}>The Service may, in future versions or at your election, offer integrations with third-party platforms. Your use of any such integration is also subject to the terms and privacy policies of those third-party providers.</p>

        <h2 style={H}>3. Your Data and Your Responsibilities</h2>
        <p style={P}><strong style={LABEL}>Ownership.</strong> You retain full ownership of all data you enter into the Service, including client information, relationship profiles, health check responses, billing records, notes, and any other content you provide ("Your Data"). We do not claim any intellectual property rights over Your Data.</p>
        <p style={P}><strong style={LABEL}>License to Us.</strong> You grant Retayned a limited, non-exclusive, worldwide license to use, process, and store Your Data solely for the purpose of providing the Service to you and, in de-identified and aggregated form only, for improving the Service. This license terminates when you delete Your Data or your account.</p>
        <p style={P}><strong style={LABEL}>You are the data controller.</strong> You are the data controller for any information you enter about your clients, and Retayned acts as your data processor. You represent and warrant that:</p>
        <ul style={{ paddingLeft: 22, marginBottom: 10 }}>
          <li style={{ marginBottom: 6 }}>You have a lawful basis under applicable privacy laws (including GDPR, UK GDPR, CCPA, and any other applicable regime) to enter your clients' information into the Service and to permit its processing as described in these Terms and the Privacy Policy;</li>
          <li style={{ marginBottom: 6 }}>You have provided any notices and obtained any consents required of you in your jurisdiction;</li>
          <li style={{ marginBottom: 6 }}>Entering your clients' information into the Service does not violate any confidentiality agreement, non-disclosure agreement, contract with your clients, or other legal obligation;</li>
          <li style={{ marginBottom: 6 }}>You will respond in a timely manner to any request we route to you from one of your clients exercising rights under applicable privacy law.</li>
        </ul>
        <p style={P}><strong style={LABEL}>Data Portability and Deletion.</strong> You may export Your Data at any time while your account is active. You may delete individual client records, Rai conversations, or your entire account at any time. Retention and deletion timelines are described in the Privacy Policy. A Data Processing Addendum is available on request at privacy@retayned.com.</p>
        <p style={P}><strong style={LABEL}>Indemnification for your representations.</strong> You agree to indemnify Retayned for any claim, regulatory action, or loss arising from your breach of the representations in this Section 3, including claims brought by your clients or by privacy regulators in connection with your processing of your clients' data.</p>

        <h2 style={H}>4. AI-Powered Features</h2>
        <p style={P}><strong style={LABEL}>Rai and AI Outputs.</strong> The Service includes AI-powered features, including the Rai advisor, retention scoring, archetype classification, Daily Sweep suggestions, and conversation scripts. These features are powered by third-party AI models accessed via API. AI-generated recommendations, scores, scripts, and suggestions ("AI Outputs") are provided for informational purposes only and do not constitute professional advice of any kind — including legal, financial, tax, or business advice.</p>
        <p style={P}><strong style={LABEL}>No Guarantees.</strong> AI Outputs are generated based on the data you provide and may not be accurate, complete, or appropriate for your specific situation. You are solely responsible for evaluating and acting on AI Outputs. Retayned does not guarantee any specific business outcome, client retention rate, revenue result, or other outcome from using the Service or following AI Outputs.</p>
        <p style={P}><strong style={LABEL}>No Training on Your Data.</strong> We do not use Your Data to train, fine-tune, or improve any third-party AI or machine learning models. Your Data is processed in real-time through the API to generate responses and is not retained by our AI providers beyond the duration of the API request, in accordance with their data processing agreements.</p>
        <p style={P}><strong style={LABEL}>Aggregated, de-identified improvement.</strong> We reserve the right to use aggregated, de-identified patterns derived from Service usage to improve our own scoring logic, archetype library, and suggestion quality. This aggregated data cannot be used to identify you, your clients, or any specific account. This activity is not "model training" of any third-party AI model.</p>
        <p style={P}><strong style={LABEL}>Rai Conversations.</strong> Rai may store recent conversation history against a client record so it can maintain context across sessions. You can delete these conversations at any time. We do not use the content of Rai conversations for any purpose other than providing the Service to you and, in de-identified and aggregated form, improving the Service as described above.</p>
        <p style={P}><strong style={LABEL}>Human Oversight.</strong> You acknowledge that all actions taken based on AI Outputs are your own decisions. You should exercise your own professional judgment before acting on any recommendation provided by the Service, including before sending communications to clients, changing pricing, or terminating a client relationship.</p>

        <h2 style={H}>5. Payment and Billing</h2>
        <p style={P}><strong style={LABEL}>Subscription Plans.</strong> The Service is offered on a subscription basis. Current pricing is displayed on our pricing page. Prices are subject to change with 30 days' notice. Subscription fees are non-refundable except as described below.</p>
        <p style={P}><strong style={LABEL}>Metered pricing.</strong> Retayned pricing includes a flat base fee plus a usage-based per-client fee. Usage is measured by the number of active client records in your portfolio during the billing period, and charges are calculated and billed in accordance with the pricing page in effect at the start of each billing period.</p>
        <p style={P}><strong style={LABEL}>Free Trial.</strong> We may offer a free trial period. At the end of the trial, your subscription will begin automatically unless you cancel before the trial ends. We will notify you before charging.</p>
        <p style={P}><strong style={LABEL}>Billing.</strong> Fees are billed on a recurring basis (monthly or annual, depending on your plan) through Stripe. You authorize us to charge your payment method on file for all applicable fees, including metered usage.</p>
        <p style={P}><strong style={LABEL}>Cancellation.</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until then. We do not provide prorated refunds for partial billing periods.</p>
        <p style={P}><strong style={LABEL}>Refunds.</strong> If you are dissatisfied with the Service, you may request a refund within 14 days of your first paid subscription charge. Refund requests after 14 days are handled at our discretion.</p>

        <h2 style={H}>6. Acceptable Use</h2>
        <p style={P}>You agree not to: use the Service for any unlawful purpose or in violation of any applicable law; upload or transmit malicious code, viruses, or harmful data; attempt to gain unauthorized access to the Service, other accounts, or our systems; interfere with or disrupt the Service or its infrastructure; resell, sublicense, or redistribute the Service without our written consent; use the Service to store or process data you do not have a lawful basis to process; enter special-category personal data (including health, biometric, or racial/ethnic data) about your clients unless you have a specific lawful basis and have notified us in advance; use automated tools (bots, scrapers) to access the Service except through our published APIs; or use the Service to harass, abuse, or harm any person, including by using AI Outputs to manipulate or coerce a client.</p>
        <p style={P}>We reserve the right to suspend or terminate your account for violations of these terms, with notice where practicable.</p>

        <h2 style={H}>7. Intellectual Property</h2>
        <p style={P}>The Service, including its design, code, features, documentation, branding, archetype library, scoring methodology, and all related intellectual property, is owned by Maniac Digital, LLC. You may not copy, modify, distribute, or create derivative works based on the Service without our written permission.</p>
        <p style={P}>The Retayned name, logo, "Rai," and related marks are trademarks of Maniac Digital, LLC. You may not use our trademarks without prior written consent.</p>

        <h2 style={H}>8. Limitation of Liability</h2>
        <p style={P}>To the maximum extent permitted by law, Retayned and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, lost profits, loss of clients, loss of data, or business interruption, arising out of or related to your use of the Service — whether based on warranty, contract, tort, or any other legal theory, even if we have been advised of the possibility of such damages.</p>
        <p style={P}>Our total aggregate liability for all claims arising out of or related to the Service shall not exceed the greater of (a) the total amount you paid to us in the twelve (12) months preceding the claim, or (b) one hundred U.S. dollars ($100).</p>
        <p style={P}>Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>

        <h2 style={H}>9. Disclaimer of Warranties</h2>
        <p style={P}>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or secure; that AI Outputs will be accurate, reliable, or suitable for your needs; that any defects will be corrected; or that the Service will meet your specific requirements or expectations.</p>

        <h2 style={H}>10. Indemnification</h2>
        <p style={P}>You agree to indemnify, defend, and hold harmless Retayned and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: your use of the Service; Your Data or your violation of any third party's rights (including claims brought by your clients); your violation of the representations in Section 3; your violation of these Terms; or any actions you take based on AI Outputs.</p>

        <h2 style={H}>11. Enterprise Product</h2>
        <p style={P}>Retayned offers a separate Enterprise product with additional access surfaces, including a managed agent API. Use of the Enterprise product is governed by a separate agreement that may supersede or supplement these Terms. These Terms govern the self-serve Service unless an Enterprise agreement is in effect.</p>

        <h2 style={H}>12. Termination</h2>
        <p style={P}>Either party may terminate these Terms at any time. You may terminate by canceling your subscription and deleting your account. We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we determine violates these Terms, is harmful to other users or the Service, or is otherwise objectionable.</p>
        <p style={P}>Upon termination, your right to use the Service ceases immediately. Sections that by their nature should survive termination — including ownership, your representations in Section 3, warranty disclaimers, indemnification, and limitation of liability — shall survive.</p>

        <h2 style={H}>13. Dispute Resolution</h2>
        <p style={P}>These Terms are governed by the laws of the District of Columbia, United States, without regard to conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration administered in Washington, DC, except that either party may seek injunctive relief in any court of competent jurisdiction. You agree to resolve disputes on an individual basis and waive any right to participate in a class action.</p>

        <h2 style={H}>14. Changes to These Terms</h2>
        <p style={P}>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on the Service, sending an email to your registered address, or through an in-app notification. Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service.</p>

        <h2 style={H}>15. General Provisions</h2>
        <p style={P}><strong style={LABEL}>Entire Agreement.</strong> These Terms, together with the Privacy Policy and any applicable Data Processing Addendum or Enterprise agreement, constitute the entire agreement between you and Retayned regarding the Service.</p>
        <p style={P}><strong style={LABEL}>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
        <p style={P}><strong style={LABEL}>Waiver.</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</p>
        <p style={P}><strong style={LABEL}>Assignment.</strong> You may not assign your rights under these Terms without our consent. We may assign our rights at any time without notice.</p>

        <h2 style={H}>16. Contact Us</h2>
        <p style={P}>If you have questions about these Terms, contact us at:</p>
        <p style={P}><strong style={LABEL}>legal@retayned.com</strong><br />Maniac Digital, LLC<br />Washington, DC, United States</p>
      </div>
    </section>
  );
}

// ═══ PLATFORM ═══
function Platform({ setPage }) {
  const [activeFeat, setActiveFeat] = useState(1);
  const [expandedText, setExpandedText] = useState(false);
  const platformFeatures = [
    { id: "today", label: "Today", icon: "◉", headline: "One page. Every priority.", sub: "Your Today tab knows which clients need you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value. Green clients surface first. At-risk clients with high revenue jump the line." },
    { id: "scoring", label: "Retention Score", icon: "◎", headline: "A number that means something.", sub: "12 dimensions. 20 combination signals. Health check modifiers. Every client gets a Retention Score from 1–99 that tells you exactly where the relationship stands — not where you hope it is." },
    { id: "health", label: "Health Checks", icon: "♡", headline: "Five questions. Two minutes. The truth.", sub: "Regular check-ins that detect drift before it becomes damage. Your answers blend directly into the Retention Score — bad news moves the number immediately. No lengthy forms. No busywork. Just the signal." },
    { id: "rai", label: "Talk to Rai", icon: "✦", headline: "She writes the words you need when it matters most.", sub: "Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script." },
    { id: "rolodex", label: "Rolodex", icon: "⟐", headline: "Your pipeline is forward-looking.", sub: "Former clients aren't dead relationships — they're future revenue. The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities." },
    { id: "referrals", label: "Referrals", icon: "⟡", headline: "Your best clients send you their friends.", sub: "Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do." },
  ];
  const pf = platformFeatures[activeFeat];

  return (
    <>
      <style>{`
        

        .r-plat-tab {
          padding: 10px 18px; border-radius: 10px; border: none; cursor: pointer;
          font-family: inherit; font-size: 13px; font-weight: 500;
          transition: all 0.25s ease; white-space: nowrap; flex: 0 0 auto;
        }
        .r-plat-tab:hover { background: rgba(255,255,255,0.6); }

        .r-plat-mockup {
          background: ${C.card}; border-radius: 18px; border: 1px solid ${C.border};
          padding: 22px; box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
        }

        .r-rai-step-card {
          padding: 32px 28px; border-radius: 18px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .r-rai-step-card:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }

        .r-combo-card {
          background: ${C.card}; border-radius: 16px; padding: 22px 18px;
          border: 1px solid ${C.border}; text-align: center;
          transition: all 0.25s ease; cursor: default;
        }
        .r-combo-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.06); }

        @keyframes dimScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes dimScrollReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      <div className="r-platform">
        {/* ══════ Hero ══════ */}
        <div className="r-full-bleed r-hero-bg r-no-pad" style={{
          background: "radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, " + C.bg + " 65%)",
          position: "relative", overflow: "hidden",
        }}>
          <section style={{ padding: "48px 20px 24px", position: "relative", zIndex: 2 }}>
            <h1 className="r-page-title" style={{
              fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 12,
              letterSpacing: "-0.04em",
            }}>
              Your clients won't know Retayned exists.<br />
              <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: C.primary }}>They'll just stay.</span>
            </h1>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>
              Relationship intelligence, health monitoring, and pipeline management in one system. Our AI isn't just smart — it's <strong style={{ color: C.text }}>emotionally intelligent</strong>.
            </p>
          </section>

          {/* ══════ Feature Tabs ══════ */}
          <section style={{ padding: "36px 20px 64px" }}>
            <div className="r-tab-bar-wrap" style={{
              display: "flex", gap: 4, background: C.surface, borderRadius: 12,
              padding: 5, marginBottom: 36, overflowX: "auto", maxWidth: 740,
              margin: "0 auto 36px", WebkitOverflowScrolling: "touch",
            }}>
              {platformFeatures.map((feat, i) => (
                <button key={feat.id} onClick={() => { setActiveFeat(i); setExpandedText(false); }} className="r-plat-tab r-tab-btn" style={{
                  background: i === activeFeat ? C.card : "transparent",
                  color: i === activeFeat ? C.primary : C.textMuted,
                  fontWeight: i === activeFeat ? 700 : 500,
                  boxShadow: i === activeFeat ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                }}>
                  <span style={{ marginRight: 4, opacity: i === activeFeat ? 1 : 0.5 }}>{feat.icon}</span>
                  {feat.label}
                </button>
              ))}
            </div>

            {/* Feature content */}
            <div className="r-feat-heading-mobile" style={{ display: "none", maxWidth: 1000, margin: "0 auto 16px" }}>
              <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15 }}>{pf.headline}</h2>
            </div>
            <div className="r-feat-content" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start", maxWidth: 1000, margin: "0 auto" }}>
              <div style={{ flex: "1 1 340px" }}>
                <h2 className="r-feat-heading-desktop" style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>{pf.headline}</h2>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.75, marginBottom: 28 }}>{pf.sub}</p>
                <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "13px 26px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Try Free Now 
                </button>
              </div>

              {/* Mockups */}
              <div style={{ flex: "1 1 360px", height: 400, overflow: "auto" }}>
                <div key={pf.id} style={{ animation: "fadeInScale 0.35s ease" }}>
                  {pf.id === "today" && (
                    <div className="r-plat-mockup">
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Your Tasks</div>
                      {[
                        { text: "Call Rachel at Broadleaf", client: "Broadleaf Media" },
                        { text: "Complete Foxglove Health Check", client: "Foxglove Partners" },
                        { text: "Review Slack for client messages", client: "All Clients" },
                        { text: "Review Oakline Q1 numbers", client: "Oakline Outdoors" },
                        { text: "Plan Northvane anniversary", client: "Northvane Studios" },
                      ].map((t, ti) => (
                        <div key={ti} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: ti > 0 ? "1px solid " + C.borderLight : "none" }}>
                          <div style={{ width: 20, height: 20, borderRadius: 5, border: "1.5px solid " + C.border, flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{t.text}</div>
                            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{t.client}</div>
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, fontSize: 13, color: C.btn, fontWeight: 700 }}>Sorted. Highest-value move is first.</div>
                    </div>
                  )}
                  {pf.id === "scoring" && (
                    <div className="r-plat-mockup">
                      <div style={{ textAlign: "center", marginBottom: 20 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 10 }}>Retention Score</div>
                        <div style={{ width: 88, height: 88, borderRadius: "50%", background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "3px solid #92400E20", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 36, fontWeight: 900, color: "#92400E", fontFamily: "inherit" }}>67</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, marginTop: 8 }}>Broadleaf Media</div>
                        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Rachel Chen · Account Lead</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                        {[["Trust", 6, C.warning], ["Loyalty", 7, C.primaryLight], ["Expectations", 7, C.primaryLight], ["Grace", 5, C.warning]].map(([name, val, color]) => (
                          <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 12px", background: C.bg, borderRadius: 8, fontSize: 13 }}>
                            <span style={{ color: C.textMuted }}>{name}</span>
                            <span style={{ fontWeight: 800, color, fontFamily: "inherit" }}>{val}/10</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                        <div style={{ flex: 1, padding: "6px 10px", background: "#FEE2E2", borderRadius: 8, fontSize: 11, color: "#991B1B", fontWeight: 700, textAlign: "center" }}>No room to operate</div>
                        <div style={{ flex: 1, padding: "6px 10px", background: "#FEF3C7", borderRadius: 8, fontSize: 11, color: "#92400E", fontWeight: 700, textAlign: "center" }}>Ice wall</div>
                      </div>
                    </div>
                  )}
                  {pf.id === "health" && (
                    <div className="r-plat-mockup">
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Health Check — Broadleaf Media</div>
                      <div style={{ display: "flex", gap: 5, marginBottom: 16 }}>
                        {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 2 ? C.primary : C.borderLight }} />)}
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Has anything changed with this relationship?</p>
                      {["Nothing — same as always", "Something minor, could be nothing", "Noticeably different from before", "Something has clearly changed"].map((opt, i) => (
                        <div key={i} style={{ padding: "12px 16px", borderRadius: 10, marginBottom: 5, background: i === 2 ? C.primarySoft : C.bg, border: "1.5px solid " + (i === 2 ? C.primary : C.borderLight), fontSize: 14, color: i === 2 ? C.primary : C.textSec, fontWeight: i === 2 ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>{opt}</div>
                      ))}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                        <span style={{ fontSize: 12, color: C.textMuted }}>2 of 5</span>
                        <div style={{ padding: "8px 20px", background: C.primary, color: "#fff", borderRadius: 8, fontWeight: 600, fontSize: 13 }}>Next</div>
                      </div>
                    </div>
                  )}
                  {pf.id === "rai" && (
                    <div className="r-plat-mockup">
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Talk to Rai</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <div style={{ alignSelf: "flex-end", maxWidth: "78%", padding: "12px 16px", background: C.primary, color: "#fff", borderRadius: "14px 14px 4px 14px", fontSize: 14, lineHeight: 1.55 }}>
                          Rachel at Broadleaf has been different lately. What should I do?
                        </div>
                        <div style={{ alignSelf: "flex-start", maxWidth: "88%", padding: "14px 16px", background: C.bg, borderRadius: "14px 14px 14px 4px", fontSize: 14, lineHeight: 1.65, border: "1px solid " + C.borderLight }}>
                          <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase" }}>✦ Rai</div>
                          Rachel's score dropped from 78 to 67 over two check-ins. The "No room to operate" combo just triggered. This isn't performance — it's relationship. <strong>Call her. Not email.</strong> Ask: "I've noticed things feel different. What's on your mind?"
                        </div>
                        <div style={{ alignSelf: "flex-start", maxWidth: "80%", padding: "10px 14px", background: C.primarySoft, borderRadius: "14px 14px 14px 4px", fontSize: 13, color: C.primary, fontStyle: "italic", border: "1px solid " + C.primarySoft }}>
                          I've flagged a profile re-evaluation for Broadleaf. Want me to queue that up?
                        </div>
                      </div>
                    </div>
                  )}
                  {pf.id === "rolodex" && (
                    <div className="r-plat-mockup">
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Rolodex</div>
                      {[
                        { name: "Maplewood Agency", type: "Former", months: "14mo together", tags: ["Would refer", "Would come back"], priority: "high" },
                        { name: "Clearpoint Digital", type: "One-off", months: "Site audit", tags: ["Would refer"], priority: "medium" },
                        { name: "Harlow & Associates", type: "Former", months: "8mo together", tags: ["Would come back"], priority: "high" },
                      ].map((r, i) => (
                        <div key={i} style={{ padding: "13px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <div>
                              <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                              <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>{r.type} · {r.months}</span>
                            </div>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.priority === "high" ? C.success : C.warning }} />
                          </div>
                          <div style={{ display: "flex", gap: 5 }}>
                            {r.tags.map(t => (
                              <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: C.primarySoft, color: C.primary }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: 12, fontSize: 13, color: C.btn, fontWeight: 700 }}>3 re-engagement opportunities</div>
                    </div>
                  )}
                  {pf.id === "referrals" && (
                    <div className="r-plat-mockup">
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 16 }}>Referral Intelligence</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 18 }}>
                        {[["Total", "7"], ["Converted", "4"], ["Revenue", "$18.4k"]].map(([label, val]) => (
                          <div key={label} style={{ background: C.bg, borderRadius: 10, padding: 12, textAlign: "center" }}>
                            <div style={{ fontSize: 22, fontWeight: 900, color: C.primary, fontFamily: "inherit" }}>{val}</div>
                            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 3 }}>{label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Ready to refer</div>
                      {[
                        { name: "Northvane Studios", readiness: 94, contact: "Sarah Chen" },
                        { name: "Oakline Outdoors", readiness: 76, contact: "James Park" },
                      ].map((r, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid " + C.borderLight }}>
                          <div>
                            <span style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</span>
                            <span style={{ fontSize: 12, color: C.textMuted, marginLeft: 8 }}>{r.contact}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{ width: 52, height: 5, borderRadius: 3, background: C.borderLight, overflow: "hidden" }}>
                              <div style={{ width: r.readiness + "%", height: "100%", background: "linear-gradient(90deg, " + C.primaryLight + ", " + C.success + ")", borderRadius: 3 }} />
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 800, color: C.success }}>{r.readiness}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>



        {/* ══════ Meet the Brains — Spiral notebook treatment ══════ */}
        <div className="r-full-bleed" style={{
          background: C.surfaceWarm,
          padding: "80px 20px 96px",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid " + C.surfaceWarmEdge,
          borderBottom: "1px solid " + C.surfaceWarmEdge,
          marginTop: 0,
        }}>

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "4px 14px",
                border: "1px solid " + C.text,
                borderRadius: 100,
                marginBottom: 16,
              }}>
                <span style={{ width: 6, height: 6, background: C.text, borderRadius: "50%" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em" }}>The brain behind the work</span>
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: C.text, marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.1 }}>Meet the Brains of the Operation</h2>
              <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
                You have 15 clients. You're focused on the three that are screaming. Rai is watching the other twelve.
              </p>
            </div></Reveal>

            {/* Step 1 */}
            <Reveal direction="left"><div style={{
              position: "relative",
              marginBottom: 20, maxWidth: 680,
              padding: "26px 28px 28px 44px",
              borderRadius: "0 4px 4px 0",
              background: "#FFFFFF",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
              transform: "rotate(-0.5deg)",
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                opacity: 0.5, pointerEvents: "none",
              }} />
              <div aria-hidden="true" style={{
                position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                background: "rgba(0,0,0,0.15)", pointerEvents: "none",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em", fontFamily: "'SF Mono', Menlo, monospace", opacity: 0.55 }}>Step · 01 · Signal Detection</div>
                <div style={{ flex: 1, height: 1, background: C.borderLight }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>She sees it.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Cross-referencing health checks, score trends, billing patterns, and 20 combination signals — continuously, across your entire book.</p>
              <div style={{ background: C.bg, borderRadius: 10, border: "1px solid " + C.borderLight, padding: "18px 20px", fontFamily: "'SF Mono', Menlo, monospace" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.danger, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em" }}>Live — scanning 15 clients</span>
                </div>
                {[
                  { name: "Broadleaf Media", score: 65, signals: ["78 → 65", "combo: no_room", "11d silent", "rate↑ no call"], status: "critical" },
                  { name: "Foxglove Partners", score: 38, signals: ["42 → 38", "HC overdue", "velocity: cold"], status: "critical" },
                  { name: "Northvane Studios", score: 91, signals: ["91 stable", "renewed", "weekly calls"], status: "clear" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none", opacity: c.status === "clear" ? 0.45 : 1 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: c.status === "critical" ? C.danger + "12" : C.success + "12", border: "1.5px solid " + (c.status === "critical" ? C.danger + "30" : C.success + "30"), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: c.status === "critical" ? C.danger : C.success, flexShrink: 0 }}>{c.score}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3, fontFamily: "inherit" }}>{c.name}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {c.signals.map(s => (
                          <span key={s} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: c.status === "critical" ? C.danger + "10" : "rgba(0,0,0,0.04)", color: c.status === "critical" ? C.danger : C.textSec, fontWeight: 600 }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div></Reveal>

            {/* Connector */}
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 1, height: 20, background: "#E0DACB" }} />
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>↓</div>
                <div style={{ width: 1, height: 20, background: "#E0DACB" }} />
              </div>
            </div>

            {/* Step 2 */}
            <Reveal delay={0.15}><div style={{
              position: "relative",
              maxWidth: 680, margin: "0 auto 20px",
              padding: "26px 28px 28px 44px",
              borderRadius: "0 4px 4px 0",
              background: "#FFFFFF",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
              transform: "rotate(0.4deg)",
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                opacity: 0.5, pointerEvents: "none",
              }} />
              <div aria-hidden="true" style={{
                position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                background: "rgba(0,0,0,0.15)", pointerEvents: "none",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em", fontFamily: "'SF Mono', Menlo, monospace", opacity: 0.55 }}>Step · 02 · Action Delivery</div>
                <div style={{ flex: 1, height: 1, background: C.borderLight }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>She calls it out.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Every morning, before your first coffee. You don't go looking for the problem. The problem finds you.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".04em" }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" stroke={C.primary} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>
                  Suggested by Rai
                </div>
                {[
                  { text: "Rachel's score dropped 9 points on last Monday's check-in, triggering the “No room to operate” combination. It looks like you've only emailed her since then. Get a call on the books with a net new deliverable ready.", client: "Broadleaf Media", gradient: "linear-gradient(95deg, " + C.dangerBg + " 0%, #FDF5F3 30%, " + C.card + " 100%)", actions: 3 },
                  { text: "Health Check is 12 days overdue. Last check flagged drift. Don't skip this one. I also recommend updating Foxglove's client profile after their recent new hire.", client: "Foxglove Partners", gradient: "linear-gradient(95deg, " + C.primarySoft + " 0%, #F0F5F1 30%, " + C.card + " 100%)", actions: 2 },
                ].map((card, i) => (
                  <div key={i} style={{ background: card.gradient, borderRadius: 14, border: "1px solid " + C.border, overflow: "hidden", boxShadow: C.cardShadow }}>
                    <div style={{ padding: "14px 18px" }}>
                      <p style={{ fontSize: 14, color: C.text, lineHeight: 1.55, margin: 0 }}>{card.text}</p>
                      <p style={{ fontSize: 12, color: C.textMuted, marginTop: 5 }}>{card.client}</p>
                    </div>
                    <div style={{ display: "flex", borderTop: "1px solid " + C.borderLight }}>
                      <div style={{ flex: 1, padding: 11, textAlign: "center", fontSize: 13, fontWeight: 600, color: C.primary }}>Add to Tasks</div>
                    </div>
                  </div>
                ))}
              </div>
            </div></Reveal>

            {/* Connector */}
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0", marginBottom: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: 1, height: 20, background: "#E0DACB" }} />
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600 }}>↓</div>
                <div style={{ width: 1, height: 20, background: "#E0DACB" }} />
              </div>
            </div>

            {/* Step 3 */}
            <Reveal direction="right" delay={0.3}><div style={{
              position: "relative",
              maxWidth: 680, marginLeft: "auto",
              padding: "26px 28px 28px 44px",
              borderRadius: "0 4px 4px 0",
              background: "#FFFFFF",
              boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
              transform: "rotate(-0.3deg)",
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                opacity: 0.5, pointerEvents: "none",
              }} />
              <div aria-hidden="true" style={{
                position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                background: "rgba(0,0,0,0.15)", pointerEvents: "none",
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em", fontFamily: "'SF Mono', Menlo, monospace", opacity: 0.55 }}>Step · 03 · Priority Engine</div>
                <div style={{ flex: 1, height: 1, background: C.borderLight }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>She ranks it.</h3>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Using a proprietary scoring engine, Rai weighs all of the day's tasks by retention impact. Your highest-value move is next up.</p>
              <div style={{ background: C.bg, borderRadius: 10, border: "1px solid " + C.borderLight, padding: "18px 20px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 12, fontFamily: "'SF Mono', Menlo, monospace", opacity: 0.7 }}>Your Tasks</div>
                {[
                  { task: "Call Rachel at Broadleaf", client: "Broadleaf Media", score: 67, status: "danger" },
                  { task: "Schedule Foxglove check-in", client: "Foxglove Partners", score: 38, status: "danger" },
                  { task: "Complete Northvane Health Check", client: "Northvane Studios", score: 91, status: "success" },
                  { task: "Review Slack for client messages", client: "All Clients", score: null, status: "neutral" },
                  { task: "Review Oakline Q1 numbers", client: "Oakline Outdoors", score: 72, status: "warning" },
                ].map((c, ci) => (
                  <div key={ci} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: ci > 0 ? "1px solid " + C.borderLight : "none" }}>
                    {c.score !== null ? (
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: c.status === "danger" ? C.danger + "12" : c.status === "success" ? C.success + "12" : C.warning + "12", border: "1.5px solid " + (c.status === "danger" ? C.danger + "30" : c.status === "success" ? C.success + "30" : C.warning + "30"), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10, color: c.status === "danger" ? C.danger : c.status === "success" ? C.success : C.warning, flexShrink: 0 }}>{c.score}</div>
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: 7, border: "1.5px solid " + C.borderLight, flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{c.task}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                        <span style={{ fontSize: 12, color: C.textMuted }}>{c.client}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 13, color: C.btn, fontWeight: 700 }}>Sorted. Highest-value move is first.</div>
              </div>
            </div></Reveal>

            {/* ─── Philosophy quote ─── */}
            <Reveal>
              <div style={{ maxWidth: 720, margin: "64px auto 0", textAlign: "center", position: "relative", zIndex: 2, paddingTop: 48, borderTop: "1px solid #E0DACB" }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".14em", color: C.textMuted, marginBottom: 18, fontFamily: "'SF Mono', Menlo, monospace" }}>As Rai sees it</div>
                <blockquote style={{ fontSize: 24, fontWeight: 400, lineHeight: 1.4, letterSpacing: "-0.01em", margin: 0, color: C.text, maxWidth: 620, marginLeft: "auto", marginRight: "auto", fontFamily: "Georgia, serif", fontStyle: "italic" }}>"The conversation you're avoiding is the one that saves the account."</blockquote>
                <p style={{ fontSize: 15, color: C.textSec, marginTop: 18, lineHeight: 1.6 }}>Rai doesn't help you avoid hard conversations. She helps you have them.</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══════ Scoring Model — Two stages ══════ */}
        <section style={{ padding: "64px 20px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><div className="r-section-head" style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: ".14em",
                color: C.primary, marginBottom: 14,
                padding: "5px 14px", borderRadius: 6,
                background: C.primarySoft,
              }}>The Scoring Model</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>Twelve questions predict whether a client stays.<br />Twenty patterns tell you why.</h2>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
                A two-layer system. One measures the fundamentals. The other catches the combinations that kill accounts.
              </p>
            </div></Reveal>

            {/* ───── STAGE 01 — Measure ───── */}
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "5px 14px 5px 6px", borderRadius: 100,
                  background: C.primary, color: "#fff",
                  fontSize: 11, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: ".14em",
                  marginBottom: 16,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "#fff", color: C.primary,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, letterSpacing: 0,
                  }}>1</span>
                  Measure
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10, color: C.text }}>Twelve dimensions.</h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
                  Each client scored on all twelve. Four carry 15% weight. Eight carry 5%.
                </p>
              </div>
            </Reveal>

            {/* Dimension strip */}
            <div style={{ overflow: "hidden", marginBottom: 72, padding: "20px 0", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(90deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 100, background: "linear-gradient(270deg, " + C.bg + ", transparent)", zIndex: 2 }} />
              <div style={{ display: "flex", alignItems: "baseline", whiteSpace: "nowrap", animation: "dimScroll 28s linear infinite", width: "max-content", marginBottom: 14 }}>
                {[...Array(2)].flatMap(() => [
                  { name: "Grace", style: { fontSize: 28, fontWeight: 400, letterSpacing: "0.02em", color: C.primary + "B0", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "TRUST", style: { fontSize: 24, fontWeight: 900, letterSpacing: "0.08em", color: C.primary + "D0", fontFamily: "inherit" } },
                  { name: "communication", style: { fontSize: 16, fontWeight: 400, letterSpacing: "0.2em", color: C.primary + "90", textTransform: "uppercase" } },
                  { name: "Loyalty", style: { fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", color: C.primary + "C0", fontFamily: "'DM Serif Display', serif" } },
                  { name: "budget risk", style: { fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: C.primary + "80", textTransform: "uppercase" } },
                  { name: "Depth", style: { fontSize: 32, fontWeight: 400, letterSpacing: "-0.03em", color: C.primary + "A0", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                ]).map((d, i) => (
                  <span key={i} style={{ ...d.style, marginRight: 56 }}>{d.name}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", whiteSpace: "nowrap", animation: "dimScrollReverse 32s linear infinite", width: "max-content", opacity: 0.7 }}>
                {[...Array(2)].flatMap(() => [
                  { name: "STRESS", style: { fontSize: 14, fontWeight: 700, letterSpacing: "0.25em", color: C.primary + "90" } },
                  { name: "Expectations", style: { fontSize: 22, fontWeight: 400, letterSpacing: "0.04em", color: C.primary + "90", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "FUNGIBILITY", style: { fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", color: C.primary + "75" } },
                  { name: "tone", style: { fontSize: 26, fontWeight: 300, letterSpacing: "0.08em", color: C.primary + "85", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" } },
                  { name: "AUTHORITY", style: { fontSize: 17, fontWeight: 900, letterSpacing: "0.1em", color: C.primary + "95" } },
                  { name: "reporting", style: { fontSize: 13, fontWeight: 400, letterSpacing: "0.15em", color: C.primary + "75", textTransform: "uppercase" } },
                ]).map((d, i) => (
                  <span key={i} style={{ ...d.style, marginRight: 56 }}>{d.name}</span>
                ))}
              </div>
            </div>

            {/* ───── STAGE 02 — Combine ───── */}
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "5px 14px 5px 6px", borderRadius: 100,
                  background: C.danger, color: "#fff",
                  fontSize: 11, fontWeight: 800,
                  textTransform: "uppercase", letterSpacing: ".14em",
                  marginBottom: 16,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "#fff", color: C.danger,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 800, letterSpacing: 0,
                  }}>2</span>
                  Combine
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10, color: C.text }}>Twenty combinations tell you what's actually breaking.</h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
                  A single low dimension is noise. Two specific ones together is a pattern. These are the patterns that predict churn — named, catalogued, and flagged automatically.
                </p>
              </div>
            </Reveal>

            <div className="r-combo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, maxWidth: 820, margin: "0 auto" }}>
              {[
                { name: "Bulletproof", a: "Loyalty", b: "Grace", desc: "Will survive your worst month.", type: "pos" },
                { name: "Ice Wall", a: "Trust", b: "Tone", desc: "Polite but completely shut down.", type: "neg" },
                { name: "Locked Vault", a: "Loyalty", b: "Depth", desc: "Double lock on the door.", type: "pos" },
                { name: "On the Clock", a: "Trust", b: "Loyalty", desc: "They've mentally left already.", type: "neg" },
                { name: "Cornerstone", a: "Replaceability", b: "Depth", desc: "Too woven in to walk away.", type: "pos" },
                { name: "Silent Exit", a: "Stress", b: "Depth", desc: "No warning before the email.", type: "neg" },
                { name: "Decision Express", a: "Authority", b: "Communication", desc: "Straight line to yes.", type: "pos" },
                { name: "No Room to Operate", a: "Trust", b: "Grace", desc: "Tightrope with no net.", type: "neg" },
              ].map((combo, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="r-combo-card">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 14 }}>
                      <div style={{ padding: "3px 9px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: combo.type === "pos" ? C.success + "12" : C.danger + "12", color: combo.type === "pos" ? C.success : C.danger }}>{combo.a}</div>
                      <div style={{ width: 20, height: 1, background: combo.type === "pos" ? C.success + "40" : C.danger + "40" }} />
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: combo.type === "pos" ? C.success : C.danger, flexShrink: 0 }} />
                      <div style={{ width: 20, height: 1, background: combo.type === "pos" ? C.success + "40" : C.danger + "40" }} />
                      <div style={{ padding: "3px 9px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: combo.type === "pos" ? C.success + "12" : C.danger + "12", color: combo.type === "pos" ? C.success : C.danger }}>{combo.b}</div>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 5, color: C.text }}>{combo.name}</div>
                    <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{combo.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <p style={{ fontSize: 12, color: C.textMuted, letterSpacing: "0.01em" }}>8 of 20 combinations shown</p>
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "13px 28px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Try Free Now
              </button>
            </div>
          </div>
        </section>

        {/* ══════ TOP EDGE: three circles (Enterprise) ══════ */}
        <div className="r-full-bleed r-ent-top-edge" aria-hidden="true" style={{
          position: "relative", height: 140, background: C.bg, overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, bottom: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", bottom: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, bottom: "-140%" }} />
        </div>

        {/* ══════ Enterprise (matches home) ══════ */}
        <div className="r-full-bleed r-ent-section" style={{
          background: C.primaryDeep, padding: "72px 20px 96px",
          position: "relative", overflow: "hidden", color: "#fff", marginTop: -1,
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 800px 500px at 50% 40%, rgba(85,139,104,0.16) 0%, transparent 65%), radial-gradient(ellipse 400px 300px at 15% 100%, rgba(91,33,182,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="r-grain" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />

          <Reveal><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "5px 12px 5px 10px", borderRadius: 100,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.02em",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, boxShadow: "0 0 8px rgba(45,134,89,0.6)" }} />
                Retayned Enterprise · Early access
              </div>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
            </div>

            <h2 className="r-ent-h2" style={{
              fontSize: 42, fontWeight: 900, letterSpacing: "-0.04em",
              lineHeight: 1.05, color: "#fff", margin: "0 0 16px", maxWidth: 820,
            }}>
              Two surfaces,<br />
              <span style={{ color: C.primaryLight }}>one brain.</span>
            </h2>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
              margin: "0 0 48px", maxWidth: 640,
            }}>
              Your top 50 accounts get a human account manager. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both.
            </p>

            <div className="r-ent-dashboard" style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 28,
              position: "relative", overflow: "hidden", marginBottom: 40,
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }} />

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(85,139,104,0.2)",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>RaiS · Live view</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Portfolio: 1,247 clients · Last sweep: 08:04</div>
                  </div>
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 11px", borderRadius: 100,
                  background: "rgba(45,134,89,0.15)",
                  fontSize: 11, fontWeight: 600, color: "#7EC29A",
                }}>
                  <span className="r-ent-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#7EC29A" }} />
                  Running
                </div>
              </div>

              <div className="r-ent-metrics" style={{
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16,
              }}>
                {[
                  { label: "Scored today", val: "1,247", suffix: "/1,247", delta: "All current", deltaColor: "#7EC29A" },
                  { label: "At-risk flagged", val: "38", delta: "+4 from yesterday", deltaColor: "#E89580" },
                  { label: "Tasks generated", val: "92", delta: "28 emails ready to send", deltaColor: "#7EC29A" },
                  { label: "Archetypes active", val: "9", delta: "Velocity decay trending", deltaColor: "rgba(255,255,255,0.5)" },
                ].map(m => (
                  <div key={m.label} className="r-ent-metric" style={{
                    padding: "14px 14px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 10,
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: ".08em", color: "rgba(255,255,255,0.4)", marginBottom: 8,
                    }}>{m.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {m.val}
                      {m.suffix && <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{m.suffix}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: m.deltaColor, fontWeight: 600, marginTop: 6 }}>{m.delta}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: 10, padding: "14px 16px",
                fontFamily: "'SF Mono', Menlo, Monaco, monospace",
                fontSize: 11.5, color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75, overflow: "hidden",
              }}>
                {[
                  { time: "08:04", lvl: "SWEEP", lvlColor: C.primaryLight, msg: "Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk." },
                  { time: "08:04", lvl: "ALERT", lvlColor: "#E89580", msg: "Foxglove Partners entered \"Velocity decay\" archetype. Confidence: 0.87." },
                  { time: "08:05", lvl: "TASK ", lvlColor: "#7EC29A", msg: "Generated 92 tasks. 28 outreach emails drafted and queued for review." },
                  { time: "08:05", lvl: "SYNC ", lvlColor: C.primaryLight, msg: "Dispatched to Slack (42), CRM (50). Next sweep: 08:04 tomorrow." },
                ].map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 44 }}>{line.time}</span>
                    <span style={{ color: line.lvlColor, fontWeight: 700, minWidth: 50 }}>{line.lvl}</span>
                    <span style={{ flex: 1 }}>{line.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="r-ent-cta-row" style={{
              display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
            }}>
              <button className="r-hero-cta" onClick={() => setPage("contact")} style={{
                background: "#fff", color: C.btn,
                padding: "14px 28px", fontSize: 14,
              }}>Request Early Access</button>
              <div style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>
                Onboarding 3 partners per quarter.<br />
                Custom pricing based on portfolio size.
              </div>
            </div>
          </div></Reveal>
        </div>

        {/* ══════ BOTTOM EDGE: three circles mirrored ══════ */}
        <div className="r-full-bleed r-ent-bottom-edge" aria-hidden="true" style={{
          position: "relative", height: 140, background: C.bg, overflow: "hidden", marginTop: -1,
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, top: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", top: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, top: "-140%" }} />
        </div>

        {/* ══════ FAQ + Final CTA (merged into one gradient, matching home) ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ padding: "48px 20px 0" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: 56 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
              <FAQ fullBleed />
            </div>
          </div>
          <div className="r-grain" style={{ opacity: 0.04 }} />
          <div style={{ padding: "56px 20px 72px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff" }}>
              You work too hard to get new clients.<br />Keep them Retayned.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.65)", marginBottom: 28, lineHeight: 1.6 }}>See the signal. Get the script. Keep the client.</p>
            <button className="cta-btn" onClick={() => setPage("signup")} style={{
              padding: "16px 40px", background: "#fff", color: C.btn, border: "none",
              borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Start Free Trial
            </button>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
          </div>
          <InlineFooter setPage={setPage} />
        </div>
      </div>
    </>
  );
}

// ═══ AUDIENCE PAGES ═══

function Freelancers({ setPage }) {
  return (
    <>
      <style>{`
        .r-aud-feat-card {
          padding: 24px; background: ${C.card}; border-radius: 14px;
          border: 1px solid ${C.borderLight}; transition: all 0.25s ease;
        }
        .r-aud-feat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
        .r-aud-pain-card {
          background: ${C.card}; border: 1px solid ${C.borderLight};
          border-radius: 14px; padding: 24px; position: relative;
        }
        .r-aud-pain-card::before {
          content: ''; position: absolute; top: 0; left: 24px; width: 36px; height: 3px;
          background: ${C.danger}; border-radius: 0 0 3px 3px;
        }
      `}</style>

      <div>
        {/* ══════ Hero ══════ */}
        <div className="r-full-bleed r-hero-bg r-no-pad" style={{
          background: `radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, ${C.bg} 65%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #E4EDDF 0%, transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />

          <section style={{ padding: "64px 20px 72px", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(216,223,216,0.6)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 22,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, display: "inline-block" }} />
                For freelancers & consultants · 1–50 clients
              </div>
              <h1 className="r-page-title" style={{
                fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1,
                marginBottom: 16, color: C.text,
              }}>
                The CRM that catches{" "}
                <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
                  <span style={{ color: C.textMuted }}>what you miss</span>
                  <span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} />
                  <span style={{ position: "absolute", top: "-0.7em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>everything</span>
                </span>.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: C.textSec, marginBottom: 28 }}>
                You're a team of one. You can't be on every Slack thread, every email, every hint of drift. Retayned watches the whole book while you focus on the work.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Start Free Trial
                </button>
                <button onClick={() => setPage("platform")} style={{ padding: "14px 30px", background: "transparent", color: C.text, border: "1.5px solid " + C.border, borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  See the platform
                </button>
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, letterSpacing: "0.01em" }}>
                $19.99/mo + $1 per client · 14-day free trial · Cancel anytime
              </p>
            </Reveal>
          </section>
        </div>

        {/* ══════ The freelancer reality ══════ */}
        <section style={{ padding: "64px 20px 48px" }}>
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: C.btn, marginBottom: 12, padding: "5px 14px", borderRadius: 6, background: "rgba(91,33,182,0.06)", display: "inline-block" }}>
                The freelancer reality
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
                You carry 30 clients in your head.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7 }}>
                You remember Rachel's daughter just started kindergarten. You remember James hates phone calls before 11. You remember the Riverton team is in a re-org. You remember all of this on Monday.<br /><br />
                By Thursday, you've been in 14 Zooms, written 3 proposals, and three of those details have gone missing.<br /><br />
                <strong style={{ color: C.text }}>You're not forgetting because you don't care. You're forgetting because no brain can hold 30 relationships at that fidelity.</strong>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══════ You know the feeling — Spiral notebook cards ══════ */}
        <div className="r-full-bleed r-notebook" style={{
          background: C.surfaceWarm,
          padding: "80px 20px 96px",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid " + C.surfaceWarmEdge,
          borderBottom: "1px solid " + C.surfaceWarmEdge,
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 56 }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "4px 14px",
                  border: "1px solid " + C.text,
                  borderRadius: 100,
                  marginBottom: 16,
                }}>
                  <span style={{ width: 6, height: 6, background: C.text, borderRadius: "50%" }} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em" }}>If you're flying solo</span>
                </div>
                <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.text, margin: "0 auto 14px", maxWidth: 720 }}>
                  You know the feeling.
                </h2>
                <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
                  A good client goes quiet. You tell yourself they're busy. Two weeks later, the email arrives.
                </p>
              </div>
            </Reveal>

            <div className="r-grid-3max r-notebook-grid" style={{ maxWidth: 1100, margin: "0 auto", gap: "40px 32px" }}>
              {[
                { cat: "Velocity", q: "You can't remember the last time you talked to half your book.", a: "Retayned tracks velocity automatically. When a relationship cools, you'll know.", stamp: "VEL↓", accent: false },
                { cat: "Drift", q: "The client you lost last month — you could have seen it coming.", a: "Retention Score weighs 12 dimensions plus 20 combination signals. You'll see drift before it's damage.", stamp: "SCORED", accent: true },
                { cat: "Overhead", q: "You don't have time for a \"CRM system.\"", a: "Retayned isn't a system to feed. It tells you what to do. You do it.", stamp: "NO-FEED", accent: false },
                { cat: "Scripts", q: "You know what to say — but not when, or how, or to who.", a: "Talk to Rai. She reads the relationship and writes the opening line.", stamp: "RAI", accent: false },
                { cat: "Outreach", q: "You send the same 'just checking in' email to everyone.", a: "Rai writes a different opening for each relationship — based on how they actually communicate.", stamp: "CUSTOM", accent: false },
                { cat: "Churn", q: "You don't know who's going to renew until they don't.", a: "Retention Score tells you where every client stands, updated weekly. Surprise churn becomes expected drift.", stamp: "LIVE", accent: true },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className={"r-notebook-card r-notebook-card-" + (i+1)} style={{
                    position: "relative",
                    padding: "26px 28px 28px 44px",
                    borderRadius: "0 4px 4px 0",
                    minHeight: 220,
                    background: "#FFFFFF",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
                  }}>
                    <div aria-hidden="true" style={{
                      position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                      backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                      opacity: 0.5,
                      pointerEvents: "none",
                    }} />
                    <div aria-hidden="true" style={{
                      position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                      background: "rgba(0,0,0,0.15)",
                      pointerEvents: "none",
                    }} />
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: C.text,
                      textTransform: "uppercase", letterSpacing: ".14em",
                      fontFamily: "'SF Mono', Menlo, monospace",
                      marginBottom: 10, opacity: 0.55,
                    }}>Pattern · {String(i+1).padStart(2, '0')} · {item.cat}</div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.3 }}>{item.q}</h3>
                    <p style={{ fontSize: 13.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{item.a}</p>
                    <span style={{
                      position: "absolute", bottom: 14, right: 18,
                      fontSize: 9.5, fontWeight: 700, color: C.text, opacity: 0.55,
                      fontFamily: "'SF Mono', Menlo, monospace", letterSpacing: ".1em",
                    }}>{item.stamp}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ══════ Pricing callout ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #C5D8CB 50%, ${C.bg} 100%)`,
          padding: "56px 20px",
          position: "relative", overflow: "hidden",
        }}>
          <Reveal>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: C.primary, marginBottom: 12 }}>One plan. Every feature.</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", color: C.text }}>$19.99</span>
                <span style={{ fontSize: 16, color: C.textMuted }}>/mo</span>
              </div>
              <div style={{ fontSize: 16, color: C.textSec, marginBottom: 28 }}>+ <span style={{ fontWeight: 700, color: C.text }}>$1 per client</span></div>
              <p style={{ fontSize: 14, color: C.textSec, marginBottom: 24 }}>
                Solve your business's most consequential problem for less than a Netflix subscription.
              </p>
              <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Start Free Trial
              </button>
              <p style={{ fontSize: 13, color: C.textMuted, marginTop: 12 }}>14-day free trial. Cancel anytime.</p>
            </div>
          </Reveal>
        </div>

        {/* ══════ What you get ══════ */}
        <section style={{ padding: "48px 20px 72px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>
                Built for a solo practice.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7 }}>
                Everything Retayned does, minus the team stuff you don't need yet.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
            {[
              { icon: "◉", label: "Today", desc: "One screen tells you which client needs you most." },
              { icon: "◎", label: "Retention Score", desc: "A number from 1–99 that tells you where every relationship stands." },
              { icon: "♡", label: "Health Checks", desc: "Five questions, two minutes. Catch drift before it's a crisis." },
              { icon: "✦", label: "Talk to Rai", desc: "AI advisor. The exact words to say, when you need them." },
              { icon: "⟐", label: "Rolodex", desc: "Former clients aren't dead. They're re-engagement opportunities." },
              { icon: "⟡", label: "Referrals", desc: "Know who's ready to refer before they know it themselves." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="r-aud-feat-card">
                  <div style={{ fontSize: 22, marginBottom: 10, opacity: 0.7 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════ FAQ + Final CTA ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ padding: "48px 20px 0" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: 56 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
              <FAQ fullBleed />
            </div>
          </div>
          <div style={{ padding: "56px 20px 72px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff" }}>
              The clients you lose are savable.<br />
              Start saving them.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.6 }}>See the signal. Get the script. Keep the client.</p>
            <button className="cta-btn" onClick={() => setPage("signup")} style={{
              padding: "16px 36px", background: "#fff", color: C.btn, border: "none",
              borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
              Start Free Trial
            </button>
          </div>
          <InlineFooter setPage={setPage} />
        </div>
      </div>
    </>
  );
}

function Agencies({ setPage }) {
  return (
    <>
      <style>{`
        .r-aud-feat-card {
          padding: 24px; background: ${C.card}; border-radius: 14px;
          border: 1px solid ${C.borderLight}; transition: all 0.25s ease;
        }
        .r-aud-feat-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); }
      `}</style>

      <div>
        {/* ══════ Hero ══════ */}
        <div className="r-full-bleed r-hero-bg r-no-pad" style={{
          background: `radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, ${C.bg} 65%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #E4EDDF 0%, transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />

          <section style={{ padding: "64px 20px 72px", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(216,223,216,0.6)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 22,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, display: "inline-block" }} />
                For agencies · 50+ clients · Teams
              </div>
              <h1 className="r-page-title" style={{
                fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1,
                marginBottom: 16, color: C.text,
              }}>
                Your team's memory,{" "}
                <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
                  <span style={{ color: C.textMuted }}>in their heads</span>
                  <span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} />
                  <span style={{ position: "absolute", top: "-0.7em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.7em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>on one system</span>
                </span>.
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: C.textSec, marginBottom: 28 }}>
                When an account manager leaves, they take 40 client relationships with them. Retayned holds the institutional knowledge — so your team doesn't have to.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Start Free Trial
                </button>
                <button onClick={() => setPage("contact")} style={{ padding: "14px 30px", background: "transparent", color: C.text, border: "1.5px solid " + C.border, borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Talk to us about teams
                </button>
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, letterSpacing: "0.01em" }}>
                $19.99/mo + $1 per client · Unlimited team members · No per-seat fees
              </p>
            </Reveal>
          </section>
        </div>

        {/* ══════ The agency problem ══════ */}
        <section style={{ padding: "64px 20px 48px" }}>
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: C.btn, marginBottom: 12, padding: "5px 14px", borderRadius: 6, background: "rgba(91,33,182,0.06)", display: "inline-block" }}>
                The agency reality
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12 }}>
                Your best account manager handles 20 clients.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7 }}>
                She remembers which ones are going through a re-org. Which ones just had a new baby. Which ones hate Zoom. Which ones had a bad Q3 and are watching spend like a hawk. <br /><br />
                Then she leaves.<br /><br />
                <strong style={{ color: C.text }}>All of that goes with her.</strong>
              </p>
            </div>
          </Reveal>
        </section>

        {/* ══════ Institutional Memory — Spiral notebook cards ══════ */}
        <div className="r-full-bleed r-notebook" style={{
          background: C.surfaceWarm,
          padding: "80px 20px 96px",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid " + C.surfaceWarmEdge,
          borderBottom: "1px solid " + C.surfaceWarmEdge,
        }}>
          <Reveal><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "4px 14px",
                border: "1px solid " + C.text,
                borderRadius: 100,
                marginBottom: 16,
              }}>
                <span style={{ width: 6, height: 6, background: C.text, borderRadius: "50%" }} />
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: ".14em" }}>Built for teams that share accounts</span>
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.text, margin: "0 auto 14px", maxWidth: 720 }}>
                Institutional memory,<br />
                <span style={{ color: C.textSec }}>not personal memory.</span>
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>
                When accounts move between AMs — or someone leaves — Retayned holds everything that matters about every client. Voice preferences. Communication archetypes. History, drift, wins, losses. Live. Current. Ready to hand off in an afternoon.
              </p>
            </div>

            <div className="r-grid-3max r-notebook-grid" style={{ maxWidth: 1100, margin: "0 auto", gap: "40px 32px" }}>
              {[
                { cat: "Access", label: "Shared book", desc: "Every team member sees every client. Every score, every signal, every archetype. Always current.", stamp: "ALL-IN", accent: false },
                { cat: "Handoff", label: "Handoff-ready", desc: "New AM takes over 30 accounts on Monday. They know every relationship by Wednesday.", stamp: "DAY-3", accent: true },
                { cat: "Voice", label: "Communication style", desc: "Rai knows how each client prefers to be approached. Your team doesn't have to re-learn 40 relationships.", stamp: "TUNED", accent: false },
                { cat: "Network", label: "Relationship web", desc: "Every stakeholder mapped — not just your primary contact. When the decision-maker changes, you don't start over.", stamp: "MAPPED", accent: false },
                { cat: "Trail", label: "Decision trail", desc: "Every commitment, scope change, and promise logged against the account. New AMs inherit what was agreed.", stamp: "LOGGED", accent: true },
                { cat: "Billing", label: "No per-seat fees", desc: "Unlimited team members on the single plan. Add anyone in the agency — no IT approvals.", stamp: "FLAT", accent: false },
              ].map((f, i) => (
                <div key={i} className={"r-notebook-card r-notebook-card-" + (i+1)} style={{
                  position: "relative",
                  padding: "26px 28px 28px 44px",
                  borderRadius: "0 4px 4px 0",
                  minHeight: 220,
                  background: "#FFFFFF",
                  boxShadow: "0 6px 16px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.04)",
                }}>
                  <div aria-hidden="true" style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 18,
                    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 6px, rgba(0,0,0,0.45) 6px 9px, transparent 9px 18px)",
                    opacity: 0.5,
                    pointerEvents: "none",
                  }} />
                  <div aria-hidden="true" style={{
                    position: "absolute", left: 7, top: 0, bottom: 0, width: 1,
                    background: "rgba(0,0,0,0.15)",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    fontSize: 10, fontWeight: 700, color: C.text,
                    textTransform: "uppercase", letterSpacing: ".14em",
                    fontFamily: "'SF Mono', Menlo, monospace",
                    marginBottom: 10, opacity: 0.55,
                  }}>Memory · {String(i+1).padStart(2, '0')} · {f.cat}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 10, lineHeight: 1.3 }}>{f.label}</h3>
                  <p style={{ fontSize: 13.5, color: C.textSec, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                  <span style={{
                    position: "absolute", bottom: 14, right: 18,
                    fontSize: 9.5, fontWeight: 700, color: C.text, opacity: 0.55,
                    fontFamily: "'SF Mono', Menlo, monospace", letterSpacing: ".1em",
                  }}>{f.stamp}</span>
                </div>
              ))}
            </div>
          </div></Reveal>
        </div>

        {/* ══════ Pricing callout ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #C5D8CB 50%, ${C.bg} 100%)`,
          padding: "56px 20px",
          position: "relative", overflow: "hidden",
        }}>
          <Reveal>
            <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", color: C.primary, marginBottom: 12 }}>One plan. Every feature.</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 56, fontWeight: 900, letterSpacing: "-0.04em", color: C.text }}>$19.99</span>
                <span style={{ fontSize: 16, color: C.textMuted }}>/mo</span>
              </div>
              <div style={{ fontSize: 16, color: C.textSec, marginBottom: 28 }}>+ <span style={{ fontWeight: 700, color: C.text }}>$1 per client</span></div>
              <p style={{ fontSize: 14, color: C.textSec, marginBottom: 24 }}>
                Solve your business's most consequential problem for less than a Netflix subscription.
              </p>
              <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Start Free Trial
              </button>
              <p style={{ fontSize: 13, color: C.textMuted, marginTop: 12 }}>14-day free trial. Cancel anytime.</p>
            </div>
          </Reveal>
        </div>

        {/* ══════ Features grid ══════ */}
        <section style={{ padding: "48px 20px 72px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 640, margin: "0 auto 40px" }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>
                Everything scales with your book.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7 }}>
                Same features as the self-serve plan. Priced per client — pay for what you cover.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 1000, margin: "0 auto" }}>
            {[
              { icon: "◉", label: "Today (team view)", desc: "Filter by AM, by vertical, by account tier. Everyone sees their own priorities." },
              { icon: "◎", label: "Portfolio scoring", desc: "Every client scored nightly. Trend lines, drift alerts, archetype tracking." },
              { icon: "♡", label: "Health Checks", desc: "Team-wide cadence. See which accounts are overdue across the whole book." },
              { icon: "✦", label: "Talk to Rai", desc: "Your whole team shares Rai's knowledge of every client relationship." },
              { icon: "⟐", label: "Shared Rolodex", desc: "Former clients aren't one AM's problem. Re-engagement becomes a team motion." },
              { icon: "⟡", label: "Referrals", desc: "See referral readiness across the book. Know which clients to ask, and when." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="r-aud-feat-card">
                  <div style={{ fontSize: 22, marginBottom: 10, opacity: 0.7 }}>{f.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 4 }}>{f.label}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.55 }}>{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════ FAQ + Final CTA ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ padding: "48px 20px 0" }}>
            <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: 56 }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
              <FAQ fullBleed />
            </div>
          </div>
          <div style={{ padding: "56px 20px 72px", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff" }}>
              Your AMs are smart.<br />
              Give them a system worth their time.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.6 }}>Start free. Add your team. Scale with your book.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="cta-btn" onClick={() => setPage("signup")} style={{
                padding: "16px 36px", background: "#fff", color: C.btn, border: "none",
                borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Start Free Trial
              </button>
              <button onClick={() => setPage("contact")} style={{
                padding: "16px 36px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              }}>
                Talk to us
              </button>
            </div>
          </div>
          <InlineFooter setPage={setPage} />
        </div>
      </div>
    </>
  );
}

function Enterprise({ setPage }) {
  return (
    <>
      <div>
        {/* ══════ Hero ══════ */}
        <div className="r-full-bleed r-hero-bg r-no-pad" style={{
          background: `radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, ${C.bg} 65%)`,
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #E4EDDF 0%, transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />

          <section style={{ padding: "64px 20px 64px", position: "relative", zIndex: 2 }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 14px", borderRadius: 100,
                background: "rgba(91,33,182,0.08)",
                border: "1px solid rgba(91,33,182,0.18)",
                fontSize: 12, fontWeight: 600, color: C.btn, marginBottom: 22,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.btn, display: "inline-block" }} />
                Retayned Enterprise · Early access
              </div>
              <h1 className="r-page-title" style={{
                fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1,
                marginBottom: 16, color: C.text,
              }}>
                Retayned Enterprise
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: C.textSec, marginBottom: 22, fontWeight: 600 }}>
                Relationship intelligence for the teams and agents managing your book.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: C.textSec, marginBottom: 28 }}>
                Your top 50 accounts get a human account manager who knows them by name. The other 950 get triaged by agents, reviewed by your team, and actioned through a single surface — with the same retention intelligence powering both.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="r-hero-cta cta-btn" onClick={() => setPage("contact")} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Request Early Access
                </button>
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, letterSpacing: "0.01em", marginTop: 14 }}>
                Onboarding 3 partners per quarter · Custom pricing based on portfolio size
              </p>
            </Reveal>
          </section>
        </div>

        {/* ══════ Two surfaces, one brain ══════ */}
        <section style={{ padding: "72px 20px 48px" }}>
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 56 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.btn, marginBottom: 12, padding: "5px 14px", borderRadius: 6, background: "rgba(91,33,182,0.06)", display: "inline-block" }}>
                The architecture
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
                Two surfaces, one brain.
              </h2>
              <p style={{ fontSize: 17, color: C.textSec, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
                The same scoring engine, archetype detection, and action layer — surfaced to your team through an app, and to your agents through an API. Both work from the same graph.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            <Reveal delay={0.05}>
              <div style={{
                padding: "32px 28px", background: C.card, border: "1px solid " + C.borderLight,
                borderRadius: 16, height: "100%",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.primary, marginBottom: 12 }}>For your team</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 14 }}>
                  A multi-seat app built for account managers.
                </h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7 }}>
                  Every client scored, ranked, and triaged daily. Health Checks run automatically. Rai surfaces the conversations that need a human, and drafts the ones that don't. Manager dashboards roll up retention risk across your entire book.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div style={{
                padding: "32px 28px", background: C.card, border: "1px solid " + C.borderLight,
                borderRadius: 16, height: "100%",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.primary, marginBottom: 12 }}>For your agents</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", color: C.text, marginBottom: 14 }}>
                  The same intelligence, exposed as MCP tools and REST endpoints.
                </h3>
                <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7 }}>
                  Point your agent stack at Retayned and every client in your book is instantly available with full relationship context. Agents handle the 80%. Humans handle the 20% that matters most. Both work from the same graph.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══════ Live dashboard section — dark ══════ */}
        <div className="r-full-bleed r-ent-top-edge" aria-hidden="true" style={{
          position: "relative", height: 140, background: C.bg, overflow: "hidden",
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, bottom: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", bottom: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, bottom: "-140%" }} />
        </div>

        <div className="r-full-bleed r-ent-section" style={{
          background: C.primaryDeep, padding: "72px 20px 96px",
          position: "relative", overflow: "hidden", color: "#fff", marginTop: -1,
        }}>
          <div aria-hidden="true" style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 800px 500px at 50% 40%, rgba(85,139,104,0.16) 0%, transparent 65%), radial-gradient(ellipse 400px 300px at 15% 100%, rgba(91,33,182,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div className="r-grain" />

          <Reveal><div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "5px 12px 5px 10px", borderRadius: 100,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.02em",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.success, boxShadow: "0 0 8px rgba(45,134,89,0.6)" }} />
                RaiS · Live view
              </div>
              <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.08), transparent)" }} />
            </div>

            <h2 className="r-ent-h2" style={{
              fontSize: 36, fontWeight: 900, letterSpacing: "-0.035em",
              lineHeight: 1.1, color: "#fff", margin: "0 0 14px", maxWidth: 820,
            }}>
              Every client. Scored, flagged,<br />and acted on — <span style={{ color: C.primaryLight }}>automatically.</span>
            </h2>
            <p style={{
              fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.7,
              margin: "0 0 48px", maxWidth: 620,
            }}>
              Retayned connects to your stack overnight, scores your entire portfolio by morning, and delivers prioritized tasks — including pre-drafted outreach — to your team or your agents.
            </p>

            <div className="r-ent-dashboard" style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16, padding: 28, position: "relative", overflow: "hidden", marginBottom: 40,
            }}>
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              }} />

              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(85,139,104,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primaryLight} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>RaiS · Live view</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Portfolio: 1,247 clients · Last sweep: 08:04</div>
                  </div>
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 11px", borderRadius: 100, background: "rgba(45,134,89,0.15)",
                  fontSize: 11, fontWeight: 600, color: "#7EC29A",
                }}>
                  <span className="r-ent-blink" style={{ width: 5, height: 5, borderRadius: "50%", background: "#7EC29A" }} />
                  Running
                </div>
              </div>

              <div className="r-ent-metrics" style={{
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 16,
              }}>
                {[
                  { label: "Scored today", val: "1,247", suffix: "/1,247", delta: "All current", deltaColor: "#7EC29A" },
                  { label: "At-risk flagged", val: "38", delta: "+4 from yesterday", deltaColor: "#E89580" },
                  { label: "Tasks generated", val: "92", delta: "28 emails ready to send", deltaColor: "#7EC29A" },
                  { label: "Archetypes active", val: "9", delta: "Velocity decay trending", deltaColor: "rgba(255,255,255,0.5)" },
                ].map(m => (
                  <div key={m.label} className="r-ent-metric" style={{
                    padding: "14px 14px", background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)", borderRadius: 10,
                  }}>
                    <div style={{
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                      letterSpacing: ".08em", color: "rgba(255,255,255,0.4)", marginBottom: 8,
                    }}>{m.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {m.val}
                      {m.suffix && <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginLeft: 2 }}>{m.suffix}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: m.deltaColor, fontWeight: 600, marginTop: 6 }}>{m.delta}</div>
                  </div>
                ))}
              </div>

              <div style={{
                background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "14px 16px",
                fontFamily: "'SF Mono', Menlo, Monaco, monospace", fontSize: 11.5,
                color: "rgba(255,255,255,0.55)", lineHeight: 1.75, overflow: "hidden",
              }}>
                {[
                  { time: "08:04", lvl: "SWEEP", lvlColor: C.primaryLight, msg: "Scored 1,247 clients. Δ avg score: −0.4. Flagged 38 at-risk." },
                  { time: "08:04", lvl: "ALERT", lvlColor: "#E89580", msg: "Foxglove Partners entered \"Velocity decay\" archetype. Confidence: 0.87." },
                  { time: "08:05", lvl: "TASK ", lvlColor: "#7EC29A", msg: "Generated 92 tasks. 28 outreach emails drafted and queued for review." },
                  { time: "08:05", lvl: "SYNC ", lvlColor: C.primaryLight, msg: "Dispatched to Slack (42), CRM (50). Next sweep: 08:04 tomorrow." },
                ].map((line, i) => (
                  <div key={i} style={{ display: "flex", gap: 12 }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", minWidth: 44 }}>{line.time}</span>
                    <span style={{ color: line.lvlColor, fontWeight: 700, minWidth: 50 }}>{line.lvl}</span>
                    <span style={{ flex: 1 }}>{line.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div></Reveal>
        </div>

        <div className="r-full-bleed r-ent-bottom-edge" aria-hidden="true" style={{
          position: "relative", height: 140, background: C.bg, overflow: "hidden", marginTop: -1,
        }}>
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "240%", height: "240%", background: C.primarySoft, top: "-220%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "200%", height: "200%", background: "#A8C3B0", top: "-180%" }} />
          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", borderRadius: "50%", width: "160%", height: "160%", background: C.primaryDeep, top: "-140%" }} />
        </div>
        {/* ══════ What's in Enterprise ══════ */}
        <section style={{ padding: "24px 20px 72px" }}>
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".14em", color: C.btn, marginBottom: 12, padding: "5px 14px", borderRadius: 6, background: "rgba(91,33,182,0.06)", display: "inline-block" }}>
                What's in Enterprise
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
                Everything in Retayned, plus the plumbing for teams and agents.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>
                Scoring, Rai, archetypes, Health Checks, Rolodex, and the Today page come standard. Enterprise adds what teams and agent stacks need to operate at scale.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { num: "01", title: "Team & permission model", desc: "Multi-user orgs. Account managers with assigned books. Team leads who see across ICs. Admins who see everything." },
              { num: "02", title: "Manager dashboard", desc: "A roll-up view above individual AMs — retention risk across the book, which AMs have the most at-risk clients, which archetypes are churning this quarter." },
              { num: "03", title: "Assignment + routing", desc: "When Rai flags a client, who gets the alert? The assigned AM, the team lead, the agent — set the rules, Retayned runs them." },
              { num: "04", title: "SSO, audit logs, SOC 2", desc: "Enterprise security checklist. SAML and OIDC supported. SOC 2 Type II on the roadmap. Audit logs for every action." },
              { num: "05", title: "MCP server + REST API", desc: "The agent surface. Point your stack at Retayned and every client's scoring, archetype, and action history is instantly available with full relationship context." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{
                  padding: "24px 22px", background: C.card, border: "1px solid " + C.borderLight,
                  borderRadius: 14, height: "100%",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "'SF Mono', Menlo, monospace", letterSpacing: "0.1em", marginBottom: 10 }}>{f.num}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</div>
                  <div style={{ fontSize: 15, color: C.textSec, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>


        {/* ══════ Integrations / specs ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #C5D8CB 50%, ${C.bg} 100%)`,
          padding: "64px 20px",
        }}>
          <Reveal>
            <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>
                Connects to what you already use.
              </h2>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7 }}>
                Retayned reads metadata from your existing stack. No new workflows for your team.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, maxWidth: 900, margin: "0 auto" }}>
            {["Slack", "Gmail", "Outlook", "Zoom", "Salesforce", "HubSpot", "Webhooks", "REST API"].map(name => (
              <div key={name} style={{
                padding: "16px 12px", background: C.card, border: "1px solid " + C.borderLight,
                borderRadius: 10, textAlign: "center",
                fontSize: 13, fontWeight: 600, color: C.text,
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* ══════ How it works (high-level) ══════ */}
        <section style={{ padding: "48px 20px 72px" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48, maxWidth: 640, margin: "0 auto 48px" }}>
              <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>
                How the engine works.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7 }}>
                Four steps, every night. Same flow that powers the Retayned app — at your team's scale.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { num: "01", label: "Score", desc: "Every client scored on 12 weighted dimensions. 20 combination signals flagged." },
              { num: "02", label: "Detect", desc: "Archetypes applied. Drift patterns identified before they cancel." },
              { num: "03", label: "Generate", desc: "Tasks created, prioritized, pre-drafted. Outreach emails ready to send." },
              { num: "04", label: "Deliver", desc: "Pushed to Slack, CRM, or email. Or consumed by your AI agents via API." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  padding: "24px 22px", background: C.card, border: "1px solid " + C.borderLight,
                  borderRadius: 14,
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "'SF Mono', Menlo, monospace", letterSpacing: "0.1em", marginBottom: 10 }}>{s.num}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════ Final CTA ══════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`,
          padding: "140px 20px 0", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "relative", zIndex: 2, maxWidth: 700, margin: "0 auto", paddingBottom: 72 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.035em", color: "#fff" }}>
              Ready to see it running on your book?
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 28, lineHeight: 1.65 }}>
              30-minute scoping call. We'll run a proof-of-concept against a subset of your portfolio within 10 business days.
            </p>
            <button className="cta-btn" onClick={() => setPage("contact")} style={{
              padding: "16px 40px", background: "#fff", color: C.btn, border: "none",
              borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
              Request Early Access
            </button>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 14 }}>
              Onboarding 3 partners per quarter · Custom pricing based on portfolio size
            </p>
          </div>
          <InlineFooter setPage={setPage} />
        </div>
      </div>
    </>
  );
}

// ═══ FEATURE PAGES ═══

function FeatureHero({ kicker, h1, sub, setPage, primaryCta = "Start Free Trial", primaryAction = "signup", secondaryCta = "See all features", secondaryAction = "platform", fine = "14-day free trial. Cancel anytime." }) {
  return (
    <div className="r-full-bleed r-hero-bg r-no-pad" style={{
      background: `radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, ${C.bg} 65%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, #E4EDDF 0%, transparent 70%)", opacity: 0.4, pointerEvents: "none" }} />

      <section style={{ padding: "64px 20px 56px", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 14px", borderRadius: 6,
            background: C.primarySoft,
            fontSize: 10, fontWeight: 700, color: C.primary,
            textTransform: "uppercase", letterSpacing: "0.14em",
            marginBottom: 18,
          }}>{kicker}</div>
          <h1 className="r-page-title" style={{
            fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1,
            marginBottom: 16, color: C.text,
          }}>{h1}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: C.textSec, marginBottom: 26 }}>{sub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            <button className="r-hero-cta cta-btn" onClick={() => setPage(primaryAction)} style={{ padding: "14px 30px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
              {primaryCta}
            </button>
            <button onClick={() => setPage(secondaryAction)} style={{ padding: "14px 30px", background: "transparent", color: C.text, border: "1.5px solid " + C.border, borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              {secondaryCta}
            </button>
          </div>
          <p style={{ fontSize: 13, color: C.textMuted, letterSpacing: "0.01em" }}>{fine}</p>
        </Reveal>
      </section>
    </div>
  );
}

function HowItWorks({ title, subtitle, steps }) {
  return (
    <section style={{ padding: "64px 20px 24px" }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 48px" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 10 }}>{title}</h2>
          <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>{subtitle}</p>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
        {steps.map((step, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              padding: "24px 22px", background: C.card, border: "1px solid " + C.borderLight,
              borderRadius: 14, height: "100%",
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "'SF Mono', Menlo, monospace", letterSpacing: "0.1em", marginBottom: 10 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 6 }}>{step.label}</div>
              <div style={{ fontSize: 13.5, color: C.textSec, lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RelatedFeatures({ setPage, current }) {
  const all = [
    { id: "feature-today", label: "Today", desc: "One page. Every priority.", icon: "◉" },
    { id: "feature-scoring", label: "Retention Score", desc: "1–99, based on 12 dimensions.", icon: "◎" },
    { id: "feature-health", label: "Health Checks", desc: "Five questions. Two minutes.", icon: "♡" },
    { id: "feature-rai", label: "Talk to Rai", desc: "AI advisor for your book.", icon: "✦" },
    { id: "feature-rolodex", label: "Rolodex", desc: "Forward-looking pipeline.", icon: "⟐" },
    { id: "feature-referrals", label: "Referrals", desc: "Who's ready, with data.", icon: "⟡" },
  ].filter(f => f.id !== current);

  return (
    <section style={{ padding: "64px 20px 48px" }}>
      <Reveal>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 36px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: C.textMuted, marginBottom: 10 }}>The rest of the platform</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 6 }}>Every feature, working together.</h2>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, maxWidth: 1100, margin: "0 auto" }}>
        {all.map(f => (
          <div key={f.id} onClick={() => setPage(f.id)} className="r-mega-row" style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            padding: "16px 14px", background: C.card, border: "1px solid " + C.borderLight,
            borderRadius: 12, cursor: "pointer",
          }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: C.primarySoft, color: C.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, fontWeight: 700 }}>{f.icon}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: C.text }}>{f.label}</span>
              <span style={{ fontSize: 11.5, color: C.textSec, lineHeight: 1.4 }}>{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureFinalCTA({ setPage, h2, sub }) {
  return (
    <div className="r-full-bleed" style={{
      background: `linear-gradient(180deg, ${C.bg} 0%, #D6E8DB 15%, #4A7B5E 40%, ${C.primaryDeep} 75%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ padding: "48px 20px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", paddingBottom: 56 }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
          <FAQ fullBleed />
        </div>
      </div>
      <div style={{ padding: "56px 20px 72px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff" }}>{h2}</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 24, lineHeight: 1.6 }}>{sub}</p>
        <button className="cta-btn" onClick={() => setPage("signup")} style={{
          padding: "16px 36px", background: "#fff", color: C.btn, border: "none",
          borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Start Free Trial
        </button>
      </div>
      <InlineFooter setPage={setPage} />
    </div>
  );
}

// ─── TODAY ───
function FeatureToday({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Today"
        h1="Your highest-value move is always first."
        sub="Today tells you who needs you most — right now. Tasks are sorted by an invisible priority engine that weighs relationship health against business value."
      />

      <HowItWorks
        title="The priority engine, in three moves."
        subtitle="Today isn't a to-do list. It's a ranked ladder of what to do next — calculated every night, updated every morning."
        steps={[
          { label: "Score the relationships", desc: "Every client's Retention Score updates overnight based on Health Checks, velocity, billing patterns, and 20 combination signals." },
          { label: "Weigh by impact", desc: "A task for a $200/mo client at-risk doesn't outrank an $8,000/mo green client who's ready to refer. Priority factors in revenue, tenure, and upside." },
          { label: "Surface the one action", desc: "You open Retayned in the morning and see the move that matters most. Not fifty tasks. The one task that will save or grow the most revenue today." },
        ]}
      />

      {/* Mockup */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Tuesday · October 14</div>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>Your Today</div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 100, background: C.primarySoft, fontSize: 11, fontWeight: 700, color: C.primary }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />5 priorities
              </div>
            </div>

            {[
              { rank: 1, text: "Call Rachel at Broadleaf", meta: "Score dropped 78 → 65 · 11 days since contact", score: 65, scoreColor: C.danger, highlight: true },
              { rank: 2, text: "Complete Foxglove Health Check", meta: "12 days overdue · Last drift: moderate", score: 42, scoreColor: C.danger },
              { rank: 3, text: "Review Slack for client messages", meta: "3 channels with unread · mixed priority", score: null },
              { rank: 4, text: "Review Oakline Q1 numbers", meta: "Upcoming QBR in 6 days", score: 73, scoreColor: C.warning },
              { rank: 5, text: "Plan Northvane anniversary", meta: "Referral-ready · loyalty score 91", score: 91, scoreColor: C.success },
            ].map((t, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 14px",
                borderBottom: i < 4 ? "1px solid " + C.borderLight : "none",
                background: t.highlight ? C.primarySoft + "40" : "transparent",
                borderRadius: t.highlight ? 10 : 0,
                margin: t.highlight ? "0 -14px" : "0",
                paddingLeft: t.highlight ? 14 : 14,
              }}>
                <div style={{ width: 22, height: 22, borderRadius: 5, border: "1.5px solid " + C.border, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: C.textMuted }}>{t.rank}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: C.text, marginBottom: 3 }}>{t.text}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.4 }}>{t.meta}</div>
                </div>
                {t.score !== null && (
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: t.scoreColor + "18", border: "1.5px solid " + t.scoreColor + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: t.scoreColor, flexShrink: 0 }}>{t.score}</div>
                )}
              </div>
            ))}

            <div style={{ marginTop: 16, padding: "12px 14px", background: C.primarySoft, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" strokeLinejoin="round" fill="none"/></svg>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>Rai's note</div>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>Broadleaf dropped into "No Room to Operate." Don't email. Call. Lead with the specific concern — her silence is the answer.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Why it matters */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>Every other CRM makes you decide.</h2>
            <p style={{ fontSize: 15.5, color: C.textSec, lineHeight: 1.75 }}>
              Most systems show you tasks in the order they were created, or by due date, or alphabetically. That's not help. That's filing. <br /><br />
              Today ranks by <strong style={{ color: C.text }}>what moves your book forward</strong>. The rules are invisible. The result is one screen that tells you exactly where to start.
            </p>
          </div>
        </Reveal>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-today" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>Know what to do first.<br />Every single day.</>}
        sub="Start free. See your first prioritized Today in 60 seconds."
      />
    </div>
  );
}

// ─── RETENTION SCORE ───
function FeatureScoring({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Retention Score"
        h1="A number that means something."
        sub="Every client gets a score from 1–99. It tells you exactly where the relationship stands — not where you hope it is."
      />

      <HowItWorks
        title="How the score is built."
        subtitle="The Retention Score isn't a gut feeling. It's the blended output of four weighted inputs, updated every time new information lands."
        steps={[
          { label: "12 weighted dimensions", desc: "Trust, loyalty, expectations, grace — and eight more. Each client is scored on all twelve. The four big ones carry 15% weight; the other eight carry 5%." },
          { label: "20 combination signals", desc: "When specific pairs of low dimensions show up together — like low trust plus low grace — a combination fires. \"No Room to Operate.\" \"Ice Wall.\" \"Silent Exit.\" Patterns no single metric catches." },
          { label: "Health Check modifier", desc: "Your regular check-ins blend in at 80/20. Bad news from a Health Check moves the score immediately." },
          { label: "Profile context", desc: "Revenue concentration, LTV, and tenure act as a multiplier on the Today page's sort — so the score you see reflects business impact, not just relationship state." },
        ]}
      />

      {/* Mockup */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 32, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", marginBottom: 28 }}>
              <div style={{ textAlign: "center", flex: "0 0 auto" }}>
                <div style={{ width: 130, height: 130, borderRadius: "50%", background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "4px solid #92400E20", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#92400E", fontFamily: "inherit", lineHeight: 1 }}>67</span>
                  <div style={{ position: "absolute", bottom: -10, background: "#fff", padding: "3px 10px", border: "1px solid #92400E30", borderRadius: 100, fontSize: 10, fontWeight: 700, color: "#92400E", textTransform: "uppercase", letterSpacing: ".08em" }}>At risk</div>
                </div>
              </div>
              <div style={{ flex: "1 1 240px" }}>
                <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em" }}>Broadleaf Media</div>
                <div style={{ fontSize: 13.5, color: C.textMuted, marginTop: 3 }}>Rachel Chen · Account Lead · 14 months</div>
                <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.danger} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                  <span style={{ fontSize: 12.5, color: C.danger, fontWeight: 700 }}>Dropped 11 points in 2 weeks</span>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Core dimensions</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
              {[["Trust", 6, C.warning], ["Loyalty", 7, C.primaryLight], ["Expectations", 7, C.primaryLight], ["Grace", 5, C.warning]].map(([name, val, color]) => (
                <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: C.bg, borderRadius: 8, fontSize: 13.5 }}>
                  <span style={{ color: C.textSec, fontWeight: 600 }}>{name}</span>
                  <span style={{ fontWeight: 800, color, fontFamily: "inherit" }}>{val}/10</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 10 }}>Active combinations</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ padding: "8px 14px", background: C.danger + "15", borderRadius: 8, fontSize: 12.5, color: C.danger, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.danger }} />
                No Room to Operate
              </div>
              <div style={{ padding: "8px 14px", background: C.warning + "15", borderRadius: 8, fontSize: 12.5, color: C.warning, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.warning }} />
                Ice Wall
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Score bands */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>Five bands. One truth per client.</h2>
            <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.65 }}>Scores aren't abstract. They map to action.</p>
          </div>
        </Reveal>
        <div style={{ maxWidth: 820, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { band: "90–99", label: "Thriving", desc: "Don't upsell them. Don't ask for referrals. Leave the relationship alone and let it compound.", bg: C.success + "15", fg: C.success },
            { band: "75–89", label: "Healthy", desc: "Stable. Maintain cadence. Watch for drift without over-correcting.", bg: C.primarySoft, fg: C.primary },
            { band: "55–74", label: "At risk", desc: "The most actionable band. Still salvageable. Move fast.", bg: C.warning + "15", fg: C.warning },
            { band: "30–54", label: "Critical", desc: "Something already broke. Call — don't email. Use Rai's scripts.", bg: C.danger + "12", fg: C.danger },
            { band: "1–29", label: "Exiting", desc: "A \"pause\" is almost always an exit. Plan the offboard. Protect the referral.", bg: "#6B7280" + "15", fg: "#6B7280" },
          ].map(b => (
            <div key={b.band} style={{ display: "flex", gap: 18, alignItems: "center", padding: "16px 20px", background: b.bg, borderRadius: 12 }}>
              <div style={{ flex: "0 0 64px" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: b.fg, fontFamily: "inherit" }}>{b.band}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: b.fg, textTransform: "uppercase", letterSpacing: ".08em" }}>{b.label}</div>
              </div>
              <div style={{ flex: 1, fontSize: 13.5, color: C.text, lineHeight: 1.55 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-scoring" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>Know exactly where<br />every relationship stands.</>}
        sub="Start free. Your first client is scored in minutes."
      />
    </div>
  );
}

// ─── HEALTH CHECKS ───
function FeatureHealth({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Health Checks"
        h1="Five questions. Two minutes. The truth."
        sub="Regular check-ins that detect drift before it becomes damage. Your answers blend into the Retention Score immediately — bad news moves the number on impact."
      />

      <HowItWorks
        title="Why Health Checks work when surveys don't."
        subtitle="Traditional NPS asks the client. Health Checks ask you — because you see things they'll never admit in a survey."
        steps={[
          { label: "Five questions, built for honesty", desc: "Not \"how is the relationship?\" — that's too abstract to answer honestly. We ask about specific observable changes: tone, cadence, signals of stress, things that have shifted since baseline." },
          { label: "Cadence that matches reality", desc: "Monthly for your critical accounts. Quarterly for your stable ones. Yearly for your thriving. You don't get pinged on a schedule that makes you lie to clear the queue." },
          { label: "Answers blend at 80/20", desc: "The Health Check score is 20% of the Retention Score. Not dominant — but enough that one bad check moves the number immediately. Drift shows up in real time." },
        ]}
      />

      {/* Mockup */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 520, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Health Check</div>
                <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" }}>Broadleaf Media</div>
              </div>
              <div style={{ fontSize: 11.5, color: C.textMuted, fontWeight: 600 }}>2 of 5</div>
            </div>

            <div style={{ display: "flex", gap: 5, marginBottom: 20 }}>
              {[1,2,3,4,5].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= 2 ? C.primary : C.borderLight }} />)}
            </div>

            <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, lineHeight: 1.4 }}>Has anything changed with how they communicate with you?</p>
            <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 14, lineHeight: 1.5 }}>Think response times, channel preference, tone, who's in the thread. Compare against the last 2–3 months.</div>

            {[
              { text: "Nothing — same as always", selected: false },
              { text: "Something minor, could be nothing", selected: false },
              { text: "Noticeably different from before", selected: true },
              { text: "Something has clearly changed", selected: false },
            ].map((opt, i) => (
              <div key={i} style={{
                padding: "13px 16px", borderRadius: 10, marginBottom: 6,
                background: opt.selected ? C.primarySoft : C.bg,
                border: "1.5px solid " + (opt.selected ? C.primary : C.borderLight),
                fontSize: 14, color: opt.selected ? C.primary : C.textSec,
                fontWeight: opt.selected ? 600 : 400,
                cursor: "pointer",
              }}>
                {opt.text}
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 18 }}>
              <span style={{ fontSize: 12, color: C.textMuted }}>← Back</span>
              <div style={{ padding: "10px 22px", background: C.primary, color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 13.5 }}>Next</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* What happens after */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>When the answer is honest, the system works.</h2>
            <p style={{ fontSize: 15.5, color: C.textSec, lineHeight: 1.75 }}>
              A two-minute Health Check that moves the Retention Score tonight is worth more than a 20-question quarterly review you filled out to get it off your plate.<br /><br />
              We designed the questions to be answerable in the elevator. <strong style={{ color: C.text }}>The honesty is the whole product.</strong>
            </p>
          </div>
        </Reveal>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-health" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>Catch drift before it's damage.<br />Two minutes at a time.</>}
        sub="Start free. Your first Health Check goes live in minutes."
      />
    </div>
  );
}

// ─── TALK TO RAI ───
function FeatureRai({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Talk to Rai"
        h1="She writes the words you need when it matters most."
        sub="Rai is an AI advisor calibrated to your specific relationships. When you don't know what to say — the opening line, the tone, whether to call or email — Rai gives you the script."
      />

      <HowItWorks
        title="Rai isn't a chatbot. She's a practitioner."
        subtitle="Built from hundreds of real client-retention scenarios, Rai reads the relationship before she writes a word."
        steps={[
          { label: "She reads the score first", desc: "Every time you Talk to Rai about a client, she pulls the current Retention Score, the active combinations, the last Health Check, the velocity trend — then writes." },
          { label: "She writes like a senior advisor", desc: "Warm, steady tone. Specific, not vague. \"Call her — not email\" rather than \"consider reaching out.\" Rai tells you exactly what to do and exactly what to say." },
          { label: "She adapts to the client", desc: "Your blunt client gets a blunt script. Your formal client gets a formal one. Rai knows each relationship's communication style from the Profile data — she doesn't talk to Rachel the way she talks to Jordan." },
        ]}
      />

      {/* Mockup — chat conversation */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 620, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, " + C.primary + ", " + C.primaryLight + ")", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 16, fontWeight: 800 }}>✦</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800 }}>Rai</div>
                <div style={{ fontSize: 11.5, color: C.textMuted }}>Senior retention advisor</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ alignSelf: "flex-end", maxWidth: "80%", padding: "12px 16px", background: C.primary, color: "#fff", borderRadius: "16px 16px 4px 16px", fontSize: 13.5, lineHeight: 1.55 }}>
                Rachel at Broadleaf has been different lately. What should I do?
              </div>

              <div style={{ alignSelf: "flex-start", maxWidth: "92%", padding: "14px 16px", background: C.bg, borderRadius: "16px 16px 16px 4px", fontSize: 13.5, lineHeight: 1.65, border: "1px solid " + C.borderLight }}>
                <div style={{ fontWeight: 800, color: C.primary, marginBottom: 6, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 5 }}>
                  <span>✦</span> Rai
                </div>
                Rachel's score dropped from 78 to 67 over two check-ins. "No Room to Operate" just triggered. This isn't performance — it's relationship.<br /><br />
                <strong style={{ color: C.text }}>Call her. Not email.</strong> Open with something specific: <em>"I've noticed things have felt different the last few weeks. I wanted to check in before we did our next review — what's on your mind?"</em>
              </div>

              <div style={{ alignSelf: "flex-start", maxWidth: "82%", padding: "10px 14px", background: C.primarySoft, borderRadius: "14px 14px 14px 4px", fontSize: 12.5, color: C.primary, fontStyle: "italic", border: "1px solid " + C.primarySoft }}>
                I've flagged a profile re-evaluation for Broadleaf. Want me to queue that up after the call?
              </div>

              <div style={{ alignSelf: "flex-end", maxWidth: "70%", padding: "10px 14px", background: C.primary + "15", color: C.primary, borderRadius: "14px 14px 4px 14px", fontSize: 12.5, fontWeight: 600 }}>
                Yes, queue it.
              </div>
            </div>

            <div style={{ marginTop: 20, padding: "11px 14px", background: C.surface, borderRadius: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: C.textMuted }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Ask Rai anything about your book...
            </div>
          </div>
        </Reveal>
      </section>

      {/* What to ask Rai */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 32px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10 }}>What you ask her.</h2>
            <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.65 }}>Real questions, real situations.</p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, maxWidth: 1000, margin: "0 auto" }}>
          {[
            "\"Should I bring up the rate increase with Maplewood now or wait?\"",
            "\"Foxglove went quiet for three weeks. What do I say to re-open without being weird?\"",
            "\"Is Northvane ready to ask for a referral? How do I ask?\"",
            "\"Our point of contact at Oakline just got promoted. Do I congratulate her or pivot to the new AM?\"",
          ].map((q, i) => (
            <div key={i} style={{ padding: "18px 20px", background: C.card, border: "1px solid " + C.borderLight, borderRadius: 12, fontSize: 13.5, color: C.text, lineHeight: 1.55, fontStyle: "italic" }}>
              {q}
            </div>
          ))}
        </div>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-rai" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>Stop drafting hard emails alone.<br />Rai is on the other side.</>}
        sub="Start free. Talk to Rai about your first real client in minutes."
      />
    </div>
  );
}

// ─── ROLODEX ───
function FeatureRolodex({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Rolodex"
        h1="Former clients aren't dead. They're future revenue."
        sub="The Rolodex tracks who left, how it ended, and whether they'd come back. One-off projects become re-engagement opportunities. Your pipeline is forward-looking."
      />

      <HowItWorks
        title="Every CRM has a graveyard. Rolodex has a garden."
        subtitle="Most tools archive old clients. We track them, score them for return-readiness, and surface them when the timing's right."
        steps={[
          { label: "Every exit gets recorded", desc: "When a client offboards, you note the context — budget cut, scope done, pivoted away, never replied. The Rolodex remembers why they left, not just that they did." },
          { label: "Return-readiness is scored", desc: "Based on how the relationship ended, how much time has passed, and signals we pick up (LinkedIn moves, funding events, public news), each former client gets a readiness score for re-engagement." },
          { label: "The right moment surfaces the right name", desc: "Someone leaves their old job and starts a new one? They pop up. You wrap a great win with Client A that could fit Client B's old pain? Rolodex flags it. You don't forget them — the system reminds you." },
        ]}
      />

      {/* Mockup */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid " + C.borderLight }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 2 }}>Rolodex</div>
                <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em" }}>12 former clients</div>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 11px", borderRadius: 100, background: C.primarySoft, fontSize: 11, fontWeight: 700, color: C.primary }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.primary }} />3 ready now
              </div>
            </div>

            {[
              { name: "Maplewood Agency", type: "Former", months: "14 months together", reason: "Budget cut Q3 2024", tags: ["Would refer", "Would come back"], readiness: 88, priority: "high", signal: "Just raised Series A" },
              { name: "Clearpoint Digital", type: "One-off", months: "Site audit, Feb 2024", reason: "Project-scoped", tags: ["Would refer"], readiness: 74, priority: "medium", signal: "Expanded team 3x" },
              { name: "Harlow & Associates", type: "Former", months: "8 months together", reason: "Internal hire", tags: ["Would come back"], readiness: 82, priority: "high", signal: "Their hire just left" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "16px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
                      <span style={{ fontWeight: 700, fontSize: 14.5 }}>{r.name}</span>
                      <span style={{ fontSize: 11.5, color: C.textMuted }}>{r.type} · {r.months}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: C.textMuted, marginBottom: 6 }}>Ended: {r.reason}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {r.tags.map(t => (
                        <span key={t} style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 5, background: C.primarySoft, color: C.primary }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.success + "15", border: "1.5px solid " + C.success + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: C.success }}>{r.readiness}</div>
                    <div style={{ fontSize: 9.5, color: C.textMuted, marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>ready</div>
                  </div>
                </div>
                <div style={{ padding: "8px 12px", background: C.primarySoft + "60", borderRadius: 8, fontSize: 12.5, color: C.primary, display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" fill="none" strokeLinejoin="round"/></svg>
                  <span><strong>Signal:</strong> {r.signal}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, fontSize: 13, color: C.btn, fontWeight: 700, textAlign: "center" }}>3 re-engagement opportunities this week</div>
          </div>
        </Reveal>
      </section>

      {/* Reframe */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>The easiest new client is an old one.</h2>
            <p style={{ fontSize: 15.5, color: C.textSec, lineHeight: 1.75 }}>
              Getting a new client costs 5–7x more than keeping one. Getting back an old one who liked you? Cheaper still.<br /><br />
              Most consultants lose touch within 6 months of an engagement ending. By 12 months, the relationship is effectively cold. <strong style={{ color: C.text }}>Rolodex keeps them warm without making you a stalker.</strong>
            </p>
          </div>
        </Reveal>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-rolodex" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>Stop letting old wins die.<br />Turn them into next quarter.</>}
        sub="Start free. Add your first former client to the Rolodex in 30 seconds."
      />
    </div>
  );
}

// ─── REFERRALS ───
function FeatureReferrals({ setPage }) {
  return (
    <div>
      <FeatureHero
        setPage={setPage}
        kicker="Referrals"
        h1="Your best clients send you their friends."
        sub="Retayned tracks referral readiness based on loyalty, trust, and relationship depth. When a client is ready to refer, the system knows before you do."
      />

      <HowItWorks
        title="Why asking for referrals backfires 80% of the time."
        subtitle="Most consultants ask everyone, or no one. Both are wrong. Readiness is a state — and it's measurable."
        steps={[
          { label: "Readiness is a combination", desc: "High loyalty + high trust + deep relationship + recent positive moment = referral-ready. We score every client against this profile continuously." },
          { label: "Timing is the entire game", desc: "Ask too early and you look needy. Ask too late and the moment's gone. Referrals has a narrow window after a clear win — and we flag it for you." },
          { label: "The right client, the right ask", desc: "Rai doesn't just tell you who's ready — she tells you how to ask. The script for a formal client is different from the script for a casual one. You get both." },
        ]}
      />

      {/* Mockup */}
      <section style={{ padding: "24px 20px 48px" }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", background: C.card, borderRadius: 20, border: "1px solid " + C.border, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 14 }}>Referral Intelligence · Last 90 days</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 22 }}>
              {[["Asked", "7"], ["Converted", "4"], ["Revenue added", "$18.4k"]].map(([label, val]) => (
                <div key={label} style={{ background: C.bg, borderRadius: 11, padding: 14, textAlign: "center" }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: C.primary, fontFamily: "inherit", lineHeight: 1 }}>{val}</div>
                  <div style={{ fontSize: 10.5, color: C.textMuted, marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".06em" }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13.5, fontWeight: 800, marginBottom: 12, color: C.text }}>Ready to refer this week</div>
            {[
              { name: "Northvane Studios", contact: "Sarah Chen", readiness: 94, note: "Just wrapped their anniversary retainer renewal." },
              { name: "Oakline Outdoors", contact: "James Park", readiness: 86, note: "Loyalty score hit 95 after Q1 campaign success." },
              { name: "Cedarwood Strategy", contact: "Alex Rivera", readiness: 79, note: "Asked twice about 'people like us.'" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                    <span style={{ fontSize: 11.5, color: C.textMuted }}>· {r.contact}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: C.textSec, lineHeight: 1.45 }}>{r.note}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{ width: 62, height: 6, borderRadius: 3, background: C.borderLight, overflow: "hidden" }}>
                    <div style={{ width: r.readiness + "%", height: "100%", background: "linear-gradient(90deg, " + C.primaryLight + ", " + C.success + ")" }} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 800, color: C.success, minWidth: 30 }}>{r.readiness}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 18, padding: "12px 14px", background: C.primarySoft, borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" strokeLinejoin="round" fill="none"/></svg>
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.55 }}>
                <strong style={{ color: C.primary }}>Rai says:</strong> Sarah at Northvane is textbook ready. Ask in-person at Thursday's sync — not by email. Frame it as \"people like you.\"
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Don't ask thriving clients */}
      <section style={{ padding: "48px 20px 72px", background: C.bg }}>
        <Reveal>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14 }}>One rule most consultants get wrong.</h2>
            <p style={{ fontSize: 15.5, color: C.textSec, lineHeight: 1.75 }}>
              Thriving clients (90+ score) — don't ask them for referrals unless they offer. The best clients will send you people organically. Asking disrupts the relationship.<br /><br />
              <strong style={{ color: C.text }}>The sweet spot is healthy clients (75–89) coming off a clear win.</strong> They're invested enough to vouch, not so enmeshed that asking feels like transactional debt. Retayned flags them specifically.
            </p>
          </div>
        </Reveal>
      </section>

      <RelatedFeatures setPage={setPage} current="feature-referrals" />

      <FeatureFinalCTA
        setPage={setPage}
        h2={<>The right ask.<br />At the exact right moment.</>}
        sub="Start free. See who's ready to refer in your book right now."
      />
    </div>
  );
}

// ═══ MAIN APP ═══
export default function RetaynedSite() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Manrope', system-ui, sans-serif", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Caveat:wght@500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #33543E; color: #fff; }
        .cta-btn { transition: all 0.2s ease; }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(91,33,182,0.25); }
        .cta-btn:active { transform: translateY(0); }
        @keyframes megaFadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .r-mega-row { transition: background 0.15s ease; }
        .r-mega-row:hover { background: ${C.primarySoft}; }
        .ch-pill { transition: all 0.15s ease; }
        .ch-pill:active { transform: scale(0.97); }
        input:focus, textarea:focus { border-color: #5B21B6 !important; outline: none; box-shadow: 0 0 0 3px rgba(91,33,182,0.1); }
        ::-webkit-scrollbar { width: 0; }
        @keyframes flyAway { 0%{transform:translateY(0) translateX(0) rotate(0deg);opacity:1}20%{transform:translateY(-4px) translateX(2px) rotate(-1deg);opacity:1}40%{transform:translateY(-14px) translateX(8px) rotate(-3deg);opacity:.9}60%{transform:translateY(-30px) translateX(18px) rotate(-7deg);opacity:.6}80%{transform:translateY(-50px) translateX(32px) rotate(-12deg);opacity:.3}100%{transform:translateY(-75px) translateX(50px) rotate(-16deg);opacity:0} }
        .fly-away { display: inline-block; animation: flyAway 2.5s ease-out forwards; }
        .r-wrap { max-width: 100%; margin: 0 auto; padding: 0; }
        .r-mobile-only { display: flex; }
        .r-desktop-nav { display: none !important; }
        .r-brain-layout { display: flex; flex-direction: column; }
        .r-brain-diagram { width: 100%; }
        .r-brain-card { margin-top: 12px; }
        .r-page-title { font-size: 30px !important; }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 8px; border-radius: 4px; background: #E8ECE6; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; box-shadow: 0 2px 8px rgba(91,33,182,0.3); }
        input[type=range]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; border: none; }
        .r-conf-inner { border-radius: 0; }
        .r-conf-img { border-radius: 0; }
        .r-conf-overlay { padding: 20px 18px !important; }
        .r-conf-overlay p { font-size: 16px !important; }
        .r-math-row .r-math-value { font-size: 18px !important; }
        .r-math-row:last-child .r-math-value { font-size: 22px !important; }
        .r-tab-btn { flex: 0 0 auto !important; }
        .r-feat-content { flex-direction: column-reverse; gap: 24px !important; }
        .r-feat-heading-mobile { display: block !important; }
        .r-feat-heading-desktop { display: none !important; }
        .r-ent-h2 { font-size: 28px !important; }
        .r-ent-metrics { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        .r-ent-top-edge, .r-ent-bottom-edge { height: 60px !important; }
        .r-ent-section { padding: 48px 20px 64px !important; }
        .r-ent-dashboard { padding: 20px !important; }
        .r-ent-cta-row { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
        .r-hero-bg { background: linear-gradient(180deg, #E4EDDF 0%, #EFF4EC 40%, #FAFAF7 75%) !important; }
        .r-hero-orb { opacity: 0.4 !important; }
        .r-hero-section { padding-bottom: 48px !important; }
        .r-how-it-works { padding-top: 32px !important; }
        .r-feat-section { padding-bottom: 32px !important; }
        .r-stats-row { flex-direction: column !important; gap: 8px !important; align-items: center !important; }
        .r-stats { font-size: 96px !important; }
        .r-tab-bar-wrap { scrollbar-width: none; -ms-overflow-style: none; }
        .r-tab-bar-wrap::-webkit-scrollbar { display: none; }
        .r-rai-step-1 { margin-left: 0; margin-right: auto; }
        .r-rai-step-2 { margin-left: auto; margin-right: auto; }
        .r-rai-step-3 { margin-left: auto; margin-right: 0; }
        .r-stat-graphic-left { width: 80px !important; height: 60px !important; left: 12px !important; top: 20px !important; bottom: auto !important; opacity: 0.10 !important; transform: none !important; }
        .r-stat-graphic-right { width: 80px !important; height: 60px !important; right: 12px !important; top: auto !important; bottom: 20px !important; opacity: 0.10 !important; transform: none !important; }
        .r-stat-accent-left, .r-stat-accent-right { display: none !important; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes dimScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes dimScrollReverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .r-full-bleed { margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); padding-left: 20px; padding-right: 20px; }
        .r-no-pad { padding-left: 0 !important; padding-right: 0 !important; }
        .r-grid-3max { display: grid; grid-template-columns: 1fr; gap: 16px; }
        .r-notebook-card-1 { transform: rotate(-0.7deg); }
        .r-notebook-card-2 { transform: rotate(0.3deg); }
        .r-notebook-card-3 { transform: rotate(-0.4deg); }
        .r-notebook-card-4 { transform: rotate(0.5deg); }
        .r-notebook-card-5 { transform: rotate(-0.3deg); }
        .r-notebook-card-6 { transform: rotate(0.4deg); }
        
        @media (min-width: 768px) {
          section { padding-left: 40px !important; padding-right: 40px !important; }
          .r-nav-inner { padding-left: 40px !important; padding-right: 40px !important; }
          .r-hero-section { padding-top: 72px !important; }
          .r-wrap { max-width: 100%; }
          .r-mobile-only { display: none !important; }
          .r-desktop-nav { display: flex !important; }
          .r-full-bleed { padding-left: 40px; padding-right: 40px; }
          .r-stat-graphic-left { width: 120px !important; height: 90px !important; left: 120px !important; bottom: -14px !important; opacity: 0.14 !important; }
          .r-stat-graphic-right { width: 120px !important; height: 90px !important; right: 120px !important; top: -16px !important; opacity: 0.14 !important; }
          .r-stat-accent-left, .r-stat-accent-right { display: block !important; }
          .r-tab-btn { flex: 1 1 0 !important; }
          .r-feat-content { flex-direction: row !important; gap: 48px !important; }
          .r-feat-heading-mobile { display: none !important; }
          .r-feat-heading-desktop { display: block !important; }
          .r-hero-bg { background: radial-gradient(ellipse 120% 90% at 25% 35%, #E4EDDF 0%, #EFF4EC 35%, #FAFAF7 65%) !important; }
          .r-hero-orb { opacity: 0.5 !important; }
          .r-stats-row { flex-direction: row !important; gap: 16px !important; }

          .r-conf-inner { max-width: 1400px; border-radius: 14px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
          .r-conf-img { border-radius: 14px; }
          .r-conf { padding: 0 40px !important; margin-bottom: 64px !important; }
          .r-conf-caption { display: block !important; }
          .r-grid-3max { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 1024px) {
          section { padding-left: 60px !important; padding-right: 60px !important; }
          .r-nav-inner { padding-left: 60px !important; padding-right: 60px !important; }
          .r-hero-text { font-size: 52px !important; }
          .r-page-title { font-size: 40px !important; }
          .r-stats { font-size: 80px !important; }
          .r-hero-center { text-align: center !important; }
          .r-hero-center p { margin-left: auto; margin-right: auto; max-width: 700px; }
          .r-brain-layout { flex-direction: row; align-items: center; gap: 40px; max-width: 1000px; margin: 0 auto; padding-bottom: 20px; }
          .r-brain-diagram { flex: 0 0 55%; }
          .r-brain-card { flex: 1; margin-top: 0; }
          .r-full-bleed { padding-left: 60px; padding-right: 60px; }
          .r-grid-3max { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (min-width: 1280px) {
          section { padding-left: 80px !important; padding-right: 80px !important; }
          .r-nav-inner { padding-left: 80px !important; padding-right: 80px !important; }
          .r-wrap { max-width: 1400px; margin: 0 auto; }
          .r-hero-text { font-size: 60px !important; }
          .r-page-title { font-size: 44px !important; }
          .r-stats { font-size: 96px !important; }
          .r-full-bleed { padding-left: 80px; padding-right: 80px; }
        }

        /* ═══════════════════════════════════════════════════ */
        /* V2 — Slite-style homepage                           */
        /* ═══════════════════════════════════════════════════ */
        .v2-root { }

        /* ═══ Platform portfolio dashboard (right column) ═══ */
        .v2-platform-portfolio {
          background: ${C.card};
          border: 8px solid #F5ECD8;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04);
          font-size: 12px;
        }
        .v2-platform-portfolio-grid {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 12px;
          align-items: start;
        }
        .v2-port-sidebar {
          display: flex; flex-direction: column; gap: 10px;
        }
        .v2-port-card {
          background: ${C.bg};
          border: 1px solid ${C.borderLight};
          border-radius: 10px;
          padding: 12px;
        }
        .v2-port-card-label {
          font-size: 9px; font-weight: 700;
          color: ${C.textMuted};
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .v2-port-movement-item {
          display: flex; align-items: center; gap: 8px;
          padding: 3px 0;
        }
        .v2-port-avatar {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 8.5px; font-weight: 700; color: #fff;
          flex-shrink: 0;
        }
        .v2-port-table-wrap {
          background: #fff;
          border: 1px solid ${C.borderLight};
          border-radius: 10px;
          overflow: hidden;
          min-width: 0;
        }
        .v2-port-controls {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 14px;
          border-bottom: 1px solid ${C.borderLight};
        }
        .v2-port-pill {
          padding: 3px 9px; border-radius: 5px;
          font-size: 10px; color: ${C.textSec};
        }
        .v2-port-pill-active {
          background: ${C.text}; color: #fff; font-weight: 700;
        }
        .v2-port-row {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 14px;
          border-bottom: 1px solid ${C.borderLight};
        }
        .v2-port-row:last-child { border-bottom: none; }
        .v2-port-row-header {
          background: ${C.bg};
          font-size: 9px; font-weight: 700;
          color: ${C.textMuted};
          letter-spacing: 0.08em;
        }
        .v2-port-col-num {
          flex: 1 1 0;
          text-align: right;
          min-width: 0;
        }
        @media (max-width: 1200px) {
          .v2-platform-portfolio-grid { grid-template-columns: 1fr; }
          .v2-port-sidebar { flex-direction: row; }
          .v2-port-sidebar > * { flex: 1; }
        }

        /* ═══ 7-cell mixed testimonials/stats grid ═══ */
        .v2-mix-cell {
          background: #F5ECD8;
          border: 1px solid rgba(28,50,36,0.06);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
        }
        .v2-mix-testimonial {
          display: flex; flex-direction: column;
        }
        .v2-mix-quote {
          font-size: 16px; color: ${C.text};
          line-height: 1.65; margin-bottom: 24;
          font-style: italic; flex: 1; margin-bottom: 24px;
        }
        .v2-mix-footer {
          border-top: 1px solid rgba(28,50,36,0.08);
          padding-top: 16px;
          display: flex; align-items: center; gap: 12px;
        }
        .v2-mix-stat {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          min-height: 220px;
        }
        .v2-mix-stat-num {
          font-size: clamp(56px, 7vw, 96px);
          font-weight: 900; color: ${C.primary};
          letter-spacing: -0.045em; line-height: 1;
          margin-bottom: 14px;
        }
        .v2-mix-stat-label {
          font-size: 13px; font-weight: 600;
          color: ${C.textMuted};
          text-transform: uppercase; letter-spacing: 0.06em;
          max-width: 220px;
        }
        .v2-mix-stat-wide {
          min-height: 160px;
          padding: 48px 32px;
        }
        .v2-mix-stat-headline {
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.05; color: ${C.text};
          max-width: 1000px; margin: 0 auto;
        }
        @media (max-width: 1024px) {
          .v2-testimonials-grid { grid-template-columns: 1fr !important; }
          .v2-mix-stat-wide { grid-column: span 1 !important; }
        }

        /* Fonts: Caveat + DM Serif Display are loaded in hero via @import */
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ═══ HERO ═══ */
        .v2-hero {
          background: #F2EEE8;
          position: relative;
          padding: 72px 48px 60px;
          overflow: hidden;
        }
        .v2-hero-inner { max-width: 1320px; margin: 0 auto; }
        @keyframes subtleBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .v2-trust-pill {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 100px;
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(216,223,216,0.8);
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          font-size: 13px; font-weight: 600;
          color: ${C.text};
          margin-bottom: 28px;
          animation: subtleBob 4s ease-in-out infinite;
        }
        .v2-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: ${C.success}; }
        .v2-hero-h1 {
          font-size: clamp(40px, 7.5vw, 104px);
          font-weight: 900; letter-spacing: -0.045em;
          line-height: 0.98;
          margin-bottom: 24px;
          color: ${C.text};
        }
        .v2-strike-wrap { position: relative; display: inline-block; }
        .v2-strike { color: ${C.textMuted}; position: relative; }
        .v2-strike::after {
          content: ''; position: absolute;
          left: -3%; top: 53%; height: 0.07em; width: 106%;
          background: ${C.danger}; border-radius: 2px;
          transform: rotate(-1deg);
        }
        .v2-caveat {
          font-family: 'Caveat', cursive;
          font-weight: 700; color: ${C.primary};
          position: absolute; top: -0.65em; left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          font-size: 0.7em; white-space: nowrap;
        }
        .v2-hero-sub {
          font-size: clamp(17px, 2vw, 22px);
          font-weight: 600; color: ${C.text};
          max-width: 760px; margin-bottom: 14px; line-height: 1.35;
        }
        .v2-hero-desc {
          font-size: clamp(15px, 1.5vw, 17px);
          color: ${C.textSec};
          max-width: 620px; line-height: 1.6; margin-bottom: 32px;
        }
        .v2-hero-cta-row { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; }
        .v2-btn-primary-lg {
          background: ${C.btn}; color: #fff;
          padding: 14px 28px; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          border: none; font-family: inherit;
        }
        .v2-btn-primary-lg:hover { background: ${C.btnHover}; }
        .v2-btn-secondary-lg {
          background: transparent; color: ${C.btn};
          padding: 14px 28px; border-radius: 12px;
          border: 2px solid ${C.btn};
          font-size: 15px; font-weight: 700; cursor: pointer;
          font-family: inherit;
        }
        .v2-btn-secondary-lg:hover { background: ${C.btnSoft}; }
        .v2-hero-fine { margin-top: 16px; font-size: 13px; color: ${C.textMuted}; }

        /* Hero device — beige on beige */
        .v2-hero-device {
          background: #F5ECD8;
          border-radius: 24px;
          padding: 32px 32px 0;
          max-width: 1200px; margin: 56px auto 0;
          position: relative;
          box-shadow: 0 24px 60px rgba(28, 50, 36, 0.08);
        }
        .v2-hero-device-inner {
          background: #fff;
          border-radius: 14px 14px 0 0;
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          overflow: hidden;
        }
        .v2-device-topbar {
          padding: 12px 18px;
          border-bottom: 1px solid ${C.borderLight};
          display: flex; align-items: center; gap: 12px;
          background: #FCFCFA;
        }
        .v2-device-dots { display: flex; gap: 6px; }
        .v2-device-dots span {
          width: 9px; height: 9px; border-radius: 50%; background: #E0DACB;
        }
        .v2-device-url {
          flex: 1; padding: 4px 12px;
          background: ${C.surfaceWarm}; border-radius: 6px;
          font-family: 'SF Mono', Menlo, monospace;
          font-size: 12px; color: ${C.textMuted};
          text-align: center;
        }

        /* Today feed */
        .v2-today-feed { padding: 20px 20px 24px; }
        .v2-feed-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 4px 14px;
          border-bottom: 1px solid ${C.borderLight};
          margin-bottom: 16px;
        }
        .v2-rai-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600;
          color: ${C.btn};
          padding: 4px 10px;
          background: ${C.btnSoft};
          border-radius: 100px;
        }
        .v2-rai-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: ${C.btn};
          animation: v2-pulse 1.4s ease-in-out infinite;
        }
        @keyframes v2-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .v2-task {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 16px;
          background: #fff;
          border: 1px solid ${C.borderLight};
          border-radius: 12px;
          margin-bottom: 10px;
          box-sizing: border-box;
        }
        .v2-tag {
          font-size: 9px; font-weight: 700;
          padding: 3px 7px; border-radius: 4px;
          text-transform: uppercase; letter-spacing: 0.1em;
          flex-shrink: 0; margin-top: 2px;
        }
        .v2-tag-urgent { background: ${C.dangerBg}; color: ${C.danger}; }
        .v2-tag-deepen { background: ${C.primarySoft}; color: ${C.primary}; }
        .v2-tag-proactive { background: ${C.btnSoft}; color: ${C.btn}; }
        .v2-tag-savings { background: ${C.warningBg}; color: ${C.warning}; }
        .v2-task-body { flex: 1; min-width: 0; }
        .v2-task-title {
          font-size: 13.5px; font-weight: 700; margin-bottom: 3px;
          color: ${C.text};
        }
        .v2-task-meta {
          font-size: 11.5px; color: ${C.textMuted}; line-height: 1.4;
        }
        .v2-score-mini {
          flex-shrink: 0;
          font-size: 12px; font-weight: 800;
          padding: 3px 9px; border-radius: 6px;
          align-self: center;
        }
        .v2-score-red { background: ${C.dangerBg}; color: ${C.danger}; }
        .v2-score-yellow { background: ${C.warningBg}; color: ${C.warning}; }
        .v2-score-green { background: ${C.primarySoft}; color: ${C.primary}; }

        .v2-rai-whisper {
          margin-top: 18px;
          padding: 14px 16px;
          background: ${C.primarySoft};
          border-radius: 12px;
          display: flex; align-items: flex-start; gap: 12px;
        }
        .v2-rai-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: ${C.btn}; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 13px;
          flex-shrink: 0;
        }
        .v2-rai-text {
          font-size: 12.5px; color: ${C.primary};
          line-height: 1.55;
        }

        /* ═══ CURVES ═══ */
        .v2-curve { display: block; width: 100vw; height: 140px; margin-top: 0; margin-bottom: 0; padding: 0; line-height: 0; }
        .v2-curve svg { display: block; width: 100%; height: 100%; }

        /* ═══ STATS BAND ═══ */
        .v2-section-stats {
          background: ${C.bg};
          padding: 56px 48px 32px;
          text-align: center;
        }
        .v2-stats-row {
          display: flex; gap: 64px; justify-content: center; flex-wrap: wrap;
          max-width: 1200px; margin: 0 auto;
        }
        .v2-stat { text-align: center; min-width: 180px; }
        .v2-stat-value {
          font-size: clamp(56px, 7vw, 80px);
          font-weight: 900; color: ${C.primary};
          letter-spacing: -0.04em; line-height: 1; margin-bottom: 8px;
        }
        .v2-stat-label {
          font-size: 13px; font-weight: 500; color: ${C.textSec};
          max-width: 220px; margin: 0 auto; line-height: 1.4;
        }

        /* ═══ SECTION SHARED ═══ */
        .v2-section-inner { max-width: 1320px; margin: 0 auto; }
        .v2-section-head { max-width: 880px; margin-bottom: 56px; }
        .v2-eyebrow {
          display: inline-block;
          font-size: 12px; font-weight: 700;
          color: ${C.primary};
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 20px;
          padding: 6px 14px;
          background: ${C.primarySoft};
          border-radius: 6px;
        }
        .v2-section-h2 {
          font-size: clamp(32px, 5vw, 72px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; margin-bottom: 20px;
          color: ${C.text};
        }
        .v2-muted { color: ${C.textMuted}; }
        .v2-section-sub {
          font-size: clamp(16px, 1.8vw, 18px);
          color: ${C.textSec};
          line-height: 1.6; max-width: 640px;
        }

        /* ═══ MEET RAI ═══ */
        .v2-section-rai { background: ${C.bg}; padding: 96px 48px; }
        .v2-rai-steps {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }
        .v2-rai-step {
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0;
          display: flex;
          flex-direction: column;
        }
        .v2-rai-step-illustration {
          width: 100%;
          aspect-ratio: 360 / 300;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-bottom: 24px;
        }
        .v2-rai-step-content {
          padding: 0 8px;
        }
        .v2-rai-step-num {
          font-family: 'SF Mono', Menlo, monospace;
          font-size: 11px; font-weight: 700;
          color: ${C.primary}; opacity: 0.7;
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 12px;
        }
        .v2-rai-step-h {
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em; margin-bottom: 10px;
          color: ${C.text};
        }
        .v2-rai-step-p {
          font-size: 14px; color: ${C.textSec}; line-height: 1.65;
        }
        /* Legacy step classes (kept in case anything else uses them) */
        .v2-step-num {
          font-family: 'SF Mono', Menlo, monospace;
          font-size: 11px; font-weight: 700;
          color: ${C.primary}; opacity: 0.7;
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 18px;
        }
        .v2-step-icon {
          width: 44px; height: 44px;
          background: ${C.primarySoft};
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; color: ${C.primary};
        }
        .v2-step-h {
          font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em; margin-bottom: 10px;
          color: ${C.text};
        }
        .v2-step-p {
          font-size: 14px; color: ${C.textSec}; line-height: 1.65;
        }

        /* ═══ PLATFORM ═══ */
        .v2-section-platform { background: #EAE4D6; padding: 112px 48px; }
        .v2-platform-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px;
          align-items: center;
        }
        .v2-bullets { margin-top: 28px; }
        .v2-bullet {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px 0;
          border-top: 1px solid rgba(216, 223, 216, 0.6);
          font-size: 15px; line-height: 1.5;
          color: ${C.text};
        }
        .v2-bullet:last-child { border-bottom: 1px solid rgba(216, 223, 216, 0.6); }
        .v2-check {
          flex-shrink: 0; width: 22px; height: 22px;
          background: ${C.primary}; color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 900; margin-top: 2px;
        }
        .v2-device-frame {
          border-radius: 24px; padding: 32px 32px 0;
          box-shadow: 0 24px 48px rgba(28, 50, 36, 0.08);
          background: #F5ECD8;
        }
        .v2-device-screen {
          background: #fff;
          border-radius: 12px 12px 0 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          overflow: hidden;
          padding: 20px 24px 24px;
          min-height: 260px;
        }
        .v2-score-label {
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: ${C.textMuted}; margin: 0 0 14px;
        }
        .v2-score-gauge { display: flex; align-items: center; gap: 20px; margin-bottom: 6px; }
        .v2-score-number {
          font-size: 64px; font-weight: 900; color: ${C.primary};
          letter-spacing: -0.04em; line-height: 1;
        }
        .v2-score-arch { flex: 1; }
        .v2-score-bar {
          height: 10px; border-radius: 6px;
          background: ${C.borderLight};
          overflow: hidden; margin-bottom: 6px;
        }
        .v2-score-fill {
          height: 100%; border-radius: 6px;
          background: linear-gradient(90deg, ${C.primary}, ${C.primaryLight});
          width: 78%;
        }
        .v2-score-range {
          font-size: 11px; color: ${C.textMuted};
          display: flex; justify-content: space-between;
        }
        .v2-score-combos { display: flex; gap: 8px; flex-wrap: wrap; }
        .v2-combo-pill {
          font-size: 11px; font-weight: 600;
          padding: 4px 10px; border-radius: 4px;
          background: ${C.primarySoft}; color: ${C.primary};
        }
        .v2-combo-pill-neg { background: ${C.dangerBg}; color: ${C.danger}; }
        .v2-score-rai {
          margin-top: 16px; padding: 12px 14px;
          background: ${C.primarySoft};
          border-radius: 10px;
          font-size: 12px; color: ${C.primary};
        }

        /* ═══ COMBOS ═══ */
        .v2-section-combos { background: ${C.bg}; padding: 160px 48px; }
        .v2-combos-head { max-width: 960px; margin: 0 auto 72px; text-align: center; }
        .v2-combos-h2 {
          font-size: clamp(40px, 5.5vw, 72px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; margin: 14px 0 16px;
          color: ${C.text};
        }
        .v2-combos-p {
          font-size: 18px; color: ${C.textSec}; line-height: 1.6;
        }
        .v2-scroll-band {
          overflow: hidden; padding: 32px 0; position: relative;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, black 10%, black 90%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, black 10%, black 90%, transparent 100%);
        }
        .v2-scroll-track {
          display: flex; gap: 72px; align-items: baseline;
          white-space: nowrap; width: max-content;
          padding: 8px 0;
          will-change: transform;
        }
        .v2-become {
          display: flex; align-items: center; justify-content: center;
          gap: 18px; padding: 40px 0; max-width: 960px; margin: 0 auto;
        }
        .v2-become-rule { flex: 1; height: 1px; background: ${C.border}; max-width: 360px; }
        .v2-become-word {
          font-size: 13px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.16em;
          color: ${C.textMuted}; white-space: nowrap;
        }

        /* Wordmark typography */
        .v2-wm, .v2-dim { display: inline-block; line-height: 1; }
        .v2-wm-pos { color: rgba(45,134,89,0.9); }
        .v2-wm-neg { color: rgba(196,67,43,0.88); }
        .v2-wm-bulletproof { font-size: 42px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-icewall { font-size: 38px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-lockedvault { font-size: 28px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
        .v2-wm-ontheclock { font-size: 36px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-cornerstone { font-size: 40px; font-weight: 400; font-family: 'DM Serif Display', serif; }
        .v2-wm-silentexit { font-size: 38px; font-weight: 400; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-decisionexpress { font-size: 26px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; }
        .v2-wm-noroom {
          font-size: 36px; font-weight: 900; letter-spacing: -0.04em;
          font-family: 'Arial Narrow', 'Helvetica Neue Condensed', Impact, sans-serif;
          transform: scaleX(0.78); transform-origin: center;
        }
        .v2-wm-truepartner { font-size: 38px; font-weight: 700; font-family: 'DM Serif Display', serif; }
        .v2-wm-tickingbomb { font-size: 28px; font-weight: 900; letter-spacing: 0.06em; text-transform: uppercase; }
        .v2-wm-smoothop { font-size: 40px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-onefoot { font-size: 38px; font-weight: 700; }
        .v2-wm-allinvestor { font-size: 34px; font-weight: 800; letter-spacing: -0.01em; }
        .v2-wm-powderkeg { font-size: 28px; font-weight: 900; letter-spacing: 0.1em; text-transform: uppercase; }
        .v2-wm-openbook { font-size: 40px; font-weight: 400; font-family: 'DM Serif Display', serif; }
        .v2-wm-nickeldime { font-size: 34px; font-weight: 400; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-resilient { font-size: 26px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
        .v2-wm-noanchor { font-size: 36px; font-weight: 300; font-family: 'DM Serif Display', serif; font-style: italic; }
        .v2-wm-lowmaint { font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
        .v2-wm-bottleneck { font-size: 28px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }

        .v2-dim { color: rgba(51, 84, 62, 0.7); }
        .v2-dim-serif { font-size: 46px; font-weight: 400; letter-spacing: -0.02em; font-family: 'DM Serif Display', serif; }
        .v2-dim-serif-italic { font-size: 46px; font-weight: 400; font-style: italic; font-family: 'DM Serif Display', serif; }
        .v2-dim-serif-italic-lg { font-size: 50px; font-weight: 400; font-style: italic; font-family: 'DM Serif Display', serif; }
        .v2-dim-heavy-caps { font-size: 40px; font-weight: 900; letter-spacing: 0.08em; text-transform: uppercase; }
        .v2-dim-spaced-lower { font-size: 24px; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; }
        .v2-dim-small-caps { font-size: 22px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }

        /* ═══ AUDIENCE ═══ */
        .v2-section-audience { background: #EAE4D6; padding: 112px 48px; }
        .v2-audience-tabs {
          display: inline-flex; gap: 4px; justify-content: center;
          margin: 0 auto 48px;
          padding: 6px;
          background: #F5ECD8;
          border-radius: 100px;
          box-shadow: inset 0 0 0 1px rgba(28, 50, 36, 0.04);
        }
        .v2-audience-tabs-wrap {
          display: flex; justify-content: center; width: 100%;
        }
        .v2-audience-tab {
          padding: 11px 28px; border-radius: 100px;
          font-size: 14px; font-weight: 600;
          color: ${C.textSec};
          border: none;
          background: transparent; cursor: pointer; font-family: inherit;
          transition: all 0.2s ease;
        }
        .v2-audience-tab:hover { color: ${C.text}; }
        .v2-audience-tab-active {
          background: ${C.primary};
          color: #fff;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(28, 50, 36, 0.12);
        }
        .v2-audience-tab-active:hover { color: #fff; }
        .v2-audience-content {
          background: #F5ECD8;
          border-radius: 24px;
          padding: 56px 48px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center;
          max-width: 1280px; margin: 0 auto;
          box-shadow: 0 24px 48px rgba(28, 50, 36, 0.06);
        }
        .v2-audience-h {
          font-size: clamp(28px, 3.5vw, 48px);
          font-weight: 900; letter-spacing: -0.03em;
          line-height: 1.05; margin-bottom: 18px;
          color: ${C.text};
        }
        .v2-audience-p {
          font-size: 16px; color: ${C.textSec}; line-height: 1.6;
          margin-bottom: 24px;
        }
        .v2-audience-demo {
          background: #fff; border-radius: 14px; padding: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .v2-demo-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid ${C.borderLight};
          font-size: 13px;
        }
        .v2-demo-row:last-child { border-bottom: none; }
        .v2-demo-av {
          width: 32px; height: 32px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 12px;
        }
        .v2-demo-body { flex: 1; }
        .v2-demo-name { font-weight: 600; color: ${C.text}; }
        .v2-demo-meta { font-size: 11px; color: ${C.textMuted}; }
        .v2-demo-sig { font-size: 11px; font-weight: 600; }

        /* ═══ ENTERPRISE ═══ */
        .v2-section-enterprise {
          background: ${C.primaryDeep};
          color: #fff;
          padding: 112px 48px;
        }
        .v2-eyebrow-enterprise {
          background: rgba(255,255,255,0.08) !important;
          color: rgba(255,255,255,0.75) !important;
        }
        .v2-h2-enterprise { color: #fff !important; }
        .v2-accent-ent { color: ${C.primaryLight}; }
        .v2-sub-enterprise { color: rgba(255,255,255,0.7) !important; }
        .v2-enterprise-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin-top: 48px;
        }
        .v2-enterprise-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 28px;
        }
        .v2-enterprise-label {
          font-size: 10px; font-weight: 700;
          color: ${C.primaryLight};
          text-transform: uppercase; letter-spacing: 0.14em;
          margin-bottom: 16px;
        }
        .v2-enterprise-h {
          font-size: 20px; font-weight: 800;
          margin-bottom: 8px; letter-spacing: -0.02em;
          color: #fff;
        }
        .v2-enterprise-p {
          font-size: 14px; color: rgba(255,255,255,0.65); line-height: 1.6;
        }
        .v2-enterprise-cta-row {
          display: flex; gap: 14px; justify-content: center; margin-top: 48px;
        }
        .v2-btn-enterprise {
          background: #fff; color: ${C.primaryDeep};
          padding: 14px 32px; border-radius: 12px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          border: none; font-family: inherit;
        }
        .v2-btn-enterprise:hover { background: ${C.primarySoft}; }

        /* ═══ FINAL CTA ═══ */
        .v2-section-final {
          background: #F2EEE8;
          padding: 112px 48px 140px;
          text-align: center;
        }
        .v2-final-h {
          font-size: clamp(36px, 6vw, 80px);
          font-weight: 900; letter-spacing: -0.04em;
          line-height: 1.02; max-width: 1000px; margin: 0 auto 20px;
          color: ${C.text};
        }
        .v2-caveat-final {
          font-family: 'Caveat', cursive;
          font-weight: 700; color: ${C.primary};
          transform: rotate(-2deg); display: inline-block;
        }
        .v2-final-sub {
          font-size: 17px; color: ${C.textSec}; line-height: 1.6;
          max-width: 620px; margin: 0 auto 32px;
        }
        .v2-final-fine { font-size: 13px; color: ${C.textMuted}; margin-top: 18px; }

        /* ═══ FOOTER ═══ */
        .v2-footer { background: ${C.primaryDeep}; color: #fff; padding: 72px 48px 36px; }
        .v2-footer-inner {
          max-width: 1320px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        .v2-footer-wordmark {
          font-size: 26px; font-weight: 900;
          letter-spacing: -0.04em; color: #fff;
          margin-bottom: 14px; cursor: pointer;
        }
        .v2-footer-tag {
          font-size: 13px; color: rgba(255,255,255,0.5);
          line-height: 1.6; max-width: 280px;
        }
        .v2-footer-col h5 {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5); margin: 0 0 14px;
        }
        .v2-footer-col a {
          display: block; font-size: 13px; color: rgba(255,255,255,0.85);
          margin-bottom: 9px; cursor: pointer; text-decoration: none;
        }
        .v2-footer-col a:hover { color: #fff; }
        .v2-footer-bottom {
          max-width: 1320px; margin: 40px auto 0;
          padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08);
          font-size: 12px; color: rgba(255,255,255,0.4);
          display: flex; justify-content: space-between;
          flex-wrap: wrap; gap: 8px;
        }

        /* ═══ V2 RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .v2-hero { padding: 56px 24px 48px; }
          .v2-hero-device { padding: 20px 16px 0; margin-top: 40px; }
          .v2-section-stats { padding: 48px 24px 32px; }
          .v2-stats-row { gap: 40px; }
          .v2-section-rai, .v2-section-platform, .v2-section-audience, .v2-section-combos { padding: 72px 24px; }
          .v2-section-enterprise, .v2-section-final { padding: 72px 24px; }
          .v2-platform-grid { grid-template-columns: 1fr; gap: 40px; }
          .v2-rai-steps { grid-template-columns: 1fr; gap: 16px; }
          .v2-audience-content { grid-template-columns: 1fr; padding: 40px 32px; gap: 32px; }
          .v2-enterprise-grid { grid-template-columns: 1fr; gap: 14px; }
          .v2-footer { padding: 56px 24px 32px; }
          .v2-footer-inner { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
        @media (max-width: 640px) {
          .v2-hero { padding: 40px 20px 40px; }
          .v2-hero-device { padding: 16px 12px 0; margin-top: 32px; border-radius: 18px; }
          .v2-today-feed { padding: 16px 14px 20px; }
          .v2-section-stats { padding: 40px 20px 24px; }
          .v2-stats-row { flex-direction: column; gap: 32px; }
          .v2-section-rai, .v2-section-platform, .v2-section-audience, .v2-section-combos { padding: 64px 20px; }
          .v2-section-enterprise, .v2-section-final { padding: 64px 20px; }
          .v2-section-head { margin-bottom: 40px; }
          .v2-audience-content { padding: 32px 24px; gap: 24px; border-radius: 18px; }
          .v2-enterprise-card { padding: 22px; }
          .v2-footer { padding: 48px 20px 28px; }
          .v2-footer-inner { grid-template-columns: 1fr; gap: 28px; }
          .v2-curve { height: 80px; }
        }
      `}</style>

      <Nav page={page} setPage={setPage} />
      <div style={{ overflowX: "hidden" }}>
      <div className="r-wrap">
        {page === "home" && ((typeof window !== "undefined" && new URLSearchParams(window.location.search).get("new") === "1") ? <HomeV2 setPage={setPage} /> : <Home setPage={setPage} />)}
        {page === "platform" && <Platform setPage={setPage} />}
        {page === "freelancers" && <Freelancers setPage={setPage} />}
        {page === "agencies" && <Agencies setPage={setPage} />}
        {page === "enterprise" && <Enterprise setPage={setPage} />}
        {page === "feature-today" && <FeatureToday setPage={setPage} />}
        {page === "feature-scoring" && <FeatureScoring setPage={setPage} />}
        {page === "feature-health" && <FeatureHealth setPage={setPage} />}
        {page === "feature-rai" && <FeatureRai setPage={setPage} />}
        {page === "feature-rolodex" && <FeatureRolodex setPage={setPage} />}
        {page === "feature-referrals" && <FeatureReferrals setPage={setPage} />}
        {page === "pricing" && <Pricing setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "faq" && <FAQPage setPage={setPage} />}
        {page === "blog" && <Blog setPage={setPage} />}
        {page === "contact" && <Contact />}
        {page === "demo" && <Demo />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "privacy" && <Privacy />}
        {page === "terms" && <Terms />}
      </div>
      {/* External footer only on pages without the 4-stop gradient inline footer */}
      {["demo","contact","login","signup","privacy","terms"].includes(page) && <Footer setPage={setPage} />}
      </div>
    </div>
  );
}
