import { useState, useEffect, useRef } from "react";

// ═══ Shared palette ═══
const C = {
  primary: "#33543E", primaryDark: "#274230", primaryDeep: "#1C3224",
  primaryLight: "#558B68", primarySoft: "#E6EFE9", primaryGhost: "#F3F8F5",
  bg: "#F7F7F4", card: "#FFFFFF", surface: "#EEEFEB",
  text: "#1E261F", textSec: "#5A6E5E", textMuted: "#92A596",
  border: "#D8DFD8", borderLight: "#E8ECE6",
  sidebar: "#1E261F", sidebarAccent: "#558B68",
  heroGrad: "linear-gradient(135deg, #1E261F, #2A382C)",
  danger: "#C4432B", dangerBg: "#FAE8E4",
  warning: "#B88B15", warningBg: "#FBF2DC",
  success: "#2D8659", successBg: "#E2F3EB",
  btn: "#5B21B6", btnHover: "#4C1D95",
  cardShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
  raiGrad: "linear-gradient(145deg, #1E261F 0%, #33543E 55%, #558B68 100%)",
};


const HEADSHOT = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA4KCw0LCQ4NDA0QDw4RFiQXFhQUFiwgIRokNC43NjMuMjI6QVNGOj1OPjIySGJJTlZYXV5dOEVmbWVabFNbXVn/2wBDAQ8QEBYTFioXFypZOzI7WVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVn/wAARCAGmASwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDuKKKKszCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACijB9DR2z2oAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiud8V64NOtjbQPi5lXlh/yzX1+ppPQaVyfWfEtlpRaPPnXA6op4X6nt9K4q/wDFWo3jN/pDRRk/6uL5OPr1NYrnzHJJY5qzFps8ygpEzKfaocjRRGLeOzENLJ8395yc/WpbfVru0YGCeVdp/hcjH4Z5qb+wbtyAIXyeM4/KnzeHrqBxuU4PtSuiuVl618banblWuBHdRZwcgKT+I716FZ3UV7aRXMDh4pFDAj+X1ryC5sLizYrJGQD2IqXTNVu9Ju0lt5GVRjdFn5XHoRVKRDiewUVU0zUINUskurYnY3BB6qfQ1bqzMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAryrxHdtfaxdSZygcovptHAFepSsUhkcdVUkfgK8fkfzHbPJPP4+tTIuJPpdust0isOMjivTbO2iWFAiAACuA0K2ee9RYgTz8xxwK9JhURoFHYVhLc6IbDhGo7CmvGrdQKkLGkz7UizPvLCG5TbKgb3xXKa7oEQheSFdrAZruHIIrG1ZgttIx6BTRtsFk1qc34GvTa6q9kTiK5UkKezj/ABGfyr0KvILC5a31q1mTl45VP15/wr188E10R2OSS1CiiiqICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCO4x9mlz/cI/SvI0RzMV2nfnBHfPpXrNyN3lp2LZNczqFjG3iiJlUYKeY/uQf8A9VYzlqdEKfu3L+k2celaei7MysNzkdSfSknvNXOWgtoETsJX5rQZXMXykK3qe1YF/ogvY1E1wxkDFi7DJPt6YrFPXU3cdNDU0++1KSUR3drEq/30b+lak0qwoXboBWZZRGEqqLsjUAAc9h1/Gk1C6cAAEdafMPlBtc07eYzdIj+jcVm+IJfM02T7O4cYzlTkGqV08rX80U+m21zagFhJs2Er6gnqfai3too0aS03fZJVztY9Dim9Cdzm/DtqbvxDZx548wMfovJ/lXrvWvPvh/aF9UubkqdsMe0H/aY/4A16DXQjjluFFFFUSFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFe63DY6jJGaooFaVSUKyZO7I57Vqsu5SDVOZWWZS2Olc9SOtzrpTXLyk4X5RTGVUJJIFRySuI/kxu6Z9KiQMynad2epPeoNUSqjSc8gHpnvWbeoFucHoDirXkskglUfvMbc5PT0rPeKRZmMpZt/JyePw9KTRaZea2+QAD5fQ9qo3yJBbMqDCrzitaGYMgU+nFZl9teZUYZQn5h6ilYCHwdbeTbIw+Xem9x6k9K6is/S4NivLjCucKPYVoV1Q2OGrbm0CiiirMgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKp3pxKn0q5VK9G5xjsKzqfCa0viGoQcg9GGarSWaRXSXWwug4dM9vX605H9eoq2rfL161gjqTsxiGzlQFRPC3cA9Kzr+SOIgW9y0khbGxkzmrchG/BjU49DVYwqJfM24I9e1U3oWrdyzDG2xWbggcj3qvb2/wBrvmOf3aD5vf2oubxY4tgJJPp1PtWjpts1vb5kGJZDuYenoKIRuzGpPlRbAAAAGAOgooorpOMKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAJABJIAHJJ7Vxel+JrefUruC6k2LLMWgkY/LjoF9unH1pfGHiSNbdrCwlWRnyszqc7R/dB9T3rgW5pSjdWZcG4u56xOuckHmkhvEC7JOHXse9ef6V4ivdOAjJ8+3H/LNz0+h7V0cOsaZqQAE32eY/wS8fr0NYcjidCmpHQtc2+Oo3Y9azr+9EMeQeT90VXk027K/u5o9vZgTWbdfZbFi93dh5MdM5P4CluO7NXQVe41NHk5CAtz611lcJ4S1D+0PEJVFMcMUDlVJ5YkgZNd3W0FZHPUd2FFFFWZhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFQ3V3b2cXm3U0cMf95zj/8AXQBNRXLXvjfT4ci1iluG9SNi/rz+lcxqnivUtQBRJhbxH+CLIz9T1osM7nVvEWn6UCssvmTD/llHy349h+NcNrHi6/1HdHE32W3PGyM8ke7VzzE5yTmmnmgdh9NzSBqXNABSHFGKOaQxwmlVdqyyBfQMQKZ3zRz6Uc0AavhzVBpGrxXLgmLBSQAZO0+n6V6xZ3ltf24ntJkmjPdT0+vpXiNWbG+utPnE1nO8Mnqp6/Ud6BNHtlFcJpnj0jamp227/prD/Vf8K6i08QaVdgGK+hBP8LnYfyNMRp0U1HSQZR1cf7JBp1AgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoorL8Rap/ZOlSTrjzm+SIH+8e/4daAMnxF4tTT5HtLFVluV4Z2+6h9Mdz+lcFeX9zezGW6meWQ92OcfT0qF2Z2LMSSTkk96Zx3plATTT6/rSnjkcik96QCHn60maU0nekMKBxRQKAFoo6GkIxyKAFpPzo5o5oASilx60GgAB9KXcfWk7UCgCWC5mt3DwyPGw7oxB/Suj03xtqNqQt1tu4/8Ab4b/AL6H9a5f1ooCx7Bo+vWOsJ/o0m2UDLQvww/xHuK1K8Qt55baZJoZGjlQ5VlOCDXq3hfWP7Y0tZJGBuYjsmAGOexx7j+tMlo2aKKKBBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVwXxBuC17aWwPypGXI9ycfyFd7Xnnj5SutQsejQL/ADNCGcqRTaeR+FMPo3B7GmMbjnjg0nfpz6U76/nSH3/OkA2k/oacaTufrSGJR3p2KCOlABjIoFA60dDQAmMHFLQRke4pB0oAKTvTu1IBQAGhe9FA6UAHY0Uv8NFAAK3fCGpHT9chDNiG4PlSenPQ/gawiaFJUhl4I5FMR7lRVXTbr7bptrc/89olc/XHP61aoJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAriviFBkWU+P70Z/Qj+tdrXP+Nrbz/D0jj70DrIPp0P8AOhDPMskcdRSE5p2cimkimMYeKM0pweh/A00ikAhHp0o9fwoPSgc0hj6D0pRRTENxQ3UGnU1vu0AIOCKAMEig96d1waAEI4oxS0UAJSHhfxp1I3SgBD900dTQeho6CkMMUHil5ppNAHqngmYTeGbYZyYi0Z9sHP8AWt+uL+HE5azvoCfuSK4H1GD/ACrtKZIUUUUCCiiigAooooAKKKKACiiigAooooAKKKKACs/Xk36Ffr/0wY/kM1oVBex+bY3Ef9+Jx+hoA8ZYYY46U01Iw4phFNlEZp8Mck0ixRI0jscBVGSaQrnvWt4Wu1sNftpZJI44zlHd+gUipeg1qyHTtEvNRvntI1WKZELlZsqcenSqdzaT2VzJb3MbRSqeVb/PNewTQwTtFcMFZxzHNHzjPv6fpWZr2ipq1kFlKLMozFOo7+/saz59Td0lbQ8vFFSXNvNaXD29whSVDgg/z+lRZrUwFpKDQKBDRTl+7im/x0q8MRQA6iikoAU01qU01uhoATPFO6c03PApw6ZP4UhiH3pvelPNJQB1HgK9+za4YGPy3SFP+BDkf1r0yvEbWd7W6injOHiYOv1Br2m2nS6toriM5SVA6/QimSyWiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUYzweh4oooA8avYjBeTRHrHIy/karkV0PjOzNrr0rgYS4AlU+/Q/qK5+mUNI/Ck2kU+g4AyT0oA3fCmoXdpctFHewRQEf6i5YhJD6A/wn3/AJ16TCyyW4kiHyMOUJBwfwrxcDd16elWrO/u7LebW5lgDcYRsDAqHC5pGdtDpvHVhughvozlY22H2BPT8D/OuLBzWhNql9NC8Mt3NJE/3kZsg1RwPQURi0KclJ3EJoBowKTB7VRAHqDR/Fmgg4owaBjieKbml69+KUKBz1oEIDxSHoa6jQIBdabJsih+0IxEZK5MnGSCP88GkvtNgukKGAWt3yUYDCyY7FRwD6GhjscsOop/XmkeN4nCyIyH0IxThSQMTFIaecAU0gntimA2vSfAWo/adJezc/vLVuP9w9PyORXm5FdD4Hujb+I4kzhZ1aMj3xkfqKQmeo0UUUyQooooAKKKKACiiigAooooAKKKKACiiigAooooAxPFOj/2tpv7oZuYctH/ALXqv4/zrzAgqSCCCOxr2quD8baKIJf7St1xHK2JVHZvX8f500M5CmSZO0Dp1p4pcZoGIBikxTsYpDQA000inUhoAbikpaDSAM8UZpuaTNACk/zpQaa3Ax+NGaQy5Y309hcebbtgkYI9R/T611n9px3uliZ2lSZnVSqIBvySvqOevPTjNcPu6VZWYmNI2VHRTuAbP5fSh6gjudS0WG80RVRWjZE3R5IPQcdOOR6VwABx0xWnfaxe342zTsIwMCNPlUD0wKz6UY2KlK4wjHr+FNJPWpCOKaw7iqJEyD14rU8Lg/8ACS6cB184fyNZP06fyrZ8JDd4nsPaQn/x00hHrVFFFMkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACsjxVH5nh289UUOPwIrXqpqsXn6VeRf3oWH6UAeQ8HkdP5UoqONsE+lPz6VQx24d6jYikJxUbNSGOJFNLYphNJSuMdmkzRRmkIKXhRk9aTNITmgYHnJPegZPSlC9zT+KLANC+nNOB9z+NLxR+FMQuRS5ptHIoAU0hooxQA3HBrc8Fxl/FFoR/CHY/gprFIrrfh3al9Ruror8sUewH3Y/4CgD0KiiigkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACkdd6Mv94EUtA6igDxQrteRf7pIqMEir2qQm31a9iIxslcfrVIDmmUMZiTUZNSFeaaVqWMbmjNGKMUtQDNGaNtHSgAAJp2ML70gbFLmmA7r7UuKYDjg0u73piFwR3pfm9jTd1G+gBdx7rS5FN30Ll2VVGWYgCgY/NGa6ODwPq8v+t+zwD/akyfyAqyfh/fYGL62J9NrUCORJzXqng2xNl4eg3DEk+Zm/Hp+mKw9O8BMlwr6hdRyRKcmOIH5vYk9BXcABQAAAAMADtQJi0UUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8t8WQ+V4jvvRiHH4gVid66bx2mzXgw/jhQ/lkVzWKYxp60hFOI5oIoGR4pdtOxQBSAbgUhWpKaaAGFRTSDTzRilYZHmlJ9qccDgcmjGOTRYBlJT8Z5pD1pWAbUtspa5gUdWkUD8xTMVb0oKdWsQ/3fPTP/fQosB7SepooPU/WiqICiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigDgfiBERqVpLjhoSufcN/wDXrkdwJrsPH+oQPc29iEzLF87SZ6bh93+RrjioHWmMXjPWijB+tGDQMQ0nOKfjiggCgBuDTcU4vjpUZY0gFJAFMLE9KMU4CkMRRilNBwKbmmIXpSUUAUgF7VPpqs+qWiqMkzJj/voVD2rV8KhP+El04PjHm9/XBx+tMD109T9aSiigkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKB1FAHk3iiQy+Ib5j0EpH5cf0rNA3KR2xwat6lcJJqN3I3IeZ2/U1Ra4GMIuBTukMkUEU7BqsZnbpSEyN3NK47FkkUxmX1qHYe5oEdF2A8lfUUm5fWk8sUFFo1ANy0hcUbB6il2gelLUY3cD2peD0peP8ikOewoAKM005pME0AKWq7oySS6zYrFneZ0xj61TC1Y0+5ay1C3uUODFIrfkef0oA9rPU0UyKWOaJJYmDxuAysOhB6U+mQFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFRXTtHazPGpZ1jYqB3ODipajnmW3t5Jn+7Gpc/gM0AeJbJJHy2Qe+akS3Bqa4uGnuJJ3+/Ixc49Sc1C0rsMDiiyKFMYXrgU0sg75pmwnlmJoKAUABkHYUnmGjAHSkyKQw3mkyTS7h6UmR6UAH40EUZXuKDjsKQDaXJoo/CgYZNLuNHNHHegQbiaMk+1GfSjHrTA9W8FyCTwxa/PuKFlPt8x4rerh/hvLmPUId3Qo4X8xn+VdxTJCiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABWV4mLDw5qBXr5J/mK1azPEhx4ev+QCYioz6nigDySg0MMEgjkUygoU80dKSkzQAE0Z9qKSkAZ9qTP8As0tJQMM+1H4UtIaAEyaOaKKQBRRS0wCigAk4AJqZbZjyxCj9aAN7wFIyeI0UPtV4nDD+9xkfyr1CvItBnWz1yzmHCrKoP0PB/nXrvTiglhRRRTEFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAVzPja58vT4LcHHnSZP0Uf4mumriPHbE31mvYRMf1pDOb2RyIRIgY9jURsoWPDMv605WNP3ZoGQNpjYykoP1FRHTp88bT+NXt5HTpT1mGetMDLaxuF/gH50z7JP/wA8zWsJRTvOU0gMb7PN/wA82pPs83/PJvyraEiHpTgRwR6UAYYglPSNvyoa3mVdxjYCtrORiop/uYPqP50AZIt5T/AfxqVLGQ/eIWrhcLmo3nJ4UUDGfZIkGWYt+lN2p0RAPelwW+8aeAFoEIiYFEnTFO3gZqJ2LH2oAYpImTHXcMfnXtf1rxvS4ftOsWcH9+ZB+Ga9kPU0IGFFFFMkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArh/HoK3tm5HymJgD75/8Ar13Fch49RmjsW2/IGcbvQ8cfpSGjjVbIFOHXrTAMGn8UDHEkdqaTnNGTTc8d6AHZFOG09xUZHvTcnnGDQBNtHrTun8VVvmFNZyB3oAs79oGDUMsgIwe5H86gLyN06VEzksAaBk7OtM8z0piruNTJB60gGhyad8xHWpRCB3pSoFMRGAAKidhzipHz0xUTDFAyzos3ka3ZS/3JlP64r2M8HFeJ23F1Ef8AbX+de2HrQhMKKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXP8AjSLzNBZx1ilVv6f1roKztfh+0aFex9/KLD8Of6UDPMRz14pSOgNMDcetOJ9KQwI4plKTSZoAXIHJoMgA4FNJHOf501nRRQAryZ6CoHekebJ46VEzGkMcXIqIuS2Sc0hOaO1IZKHI6U4PM33QxqJWIqYXB70xCeZKPWl86TvUyzKR0pfMT+7QBCGY9aVulPLjHA5qJjQAinEqkete2qcop9QK8SUZlQDuQK9tUYUD0GKaExaKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUdwu+2lT+8jD9KkoIyMetAHjgHApSfWlcFZGA7Mf50yRuMYpFCZzSBsetMNL2NACbiaibLGpCcLURIA96QxpwKYT9KGOTSUgE6mlNdPZ6E48FX1/JH+8kKSRevlqeT+OT+VcuaBjhT1wewpg6U5TTEPJA6CgP7U0LuPNPCigBwOaa3WnYwKY33qAH2w3XcIHeRR+or2w9TXjGlr5mrWaf3p0H/jwr2c9T9aaEwooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFKOo+tFFAHkN6uy9uAO0rj9TVUjPNFFIoac55oY/LRRQBE2aiIoopDExUlrAbm6hgDBTK6oD6ZOKKKQz2VtOiOknTcnyvJ8jPfGMZrxeaPypnjznYxXPrg4oopslDQOKcBRRQMkUU7OKKKAFGTTXHP4UUUAaHhuLzfEWnoennKfy5/pXr1FFNEsKKKKYgooooAKKKKACiiigAooooA//9k=";

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
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { id: "platform", label: "Platform" },
    { id: "pricing", label: "Pricing" },
    { id: "about", label: "About" },
    { id: "blog", label: "Resources" },
    { id: "contact", label: "Contact" },
    { id: "login", label: "Log In" },
  ];
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
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
            </div>
          </div>
          <div className="r-desktop-nav" style={{ display: "none", alignItems: "baseline", gap: 28 }}>
            {links.filter(l => l.id !== "login").map(l => (
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
      {/* Left drawer + swipe */}
      <SwipeDrawer open={open} setOpen={setOpen}>
        <div style={{ padding: "24px 24px 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: 32, cursor: "pointer" }} onClick={() => { setPage("home"); setOpen(false); }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
          </div>
          {links.map(l => (
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
    <footer style={{ background: "#1E261F", borderTop: "none", padding: "32px 20px 24px", marginTop: -1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => setPage("home")}>
          <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.7)" }}>Retayned</span>
          <span style={{ fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.7)", marginLeft: 1 }}>.</span>
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>There's no "i" in Retayned.</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
        {[["platform","Platform"],["pricing","Pricing"],["about","About"],["faq","FAQs"],["contact","Contact"],["privacy","Privacy"],["terms","Terms"]].map(([id, label]) => (
          <span key={id} onClick={() => setPage(id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(id)} style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>{label}</span>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.5 }}>
          <sup>1</sup> Reichheld, F. & Schefter, P. "The Economics of E-Loyalty." Harvard Business School / Bain & Company.
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>© {new Date().getFullYear()} Maniac Digital, LLC</div>
      </div>
    </footer>
  );
}

// ═══ Animated counter ═══
function AnimatedStat({ value, suffix = "", duration = 1800 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
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
    const num = parseInt(value);
    if (isNaN(num)) { setDisplay(value); return; }
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const t = step / steps;
      const ease = 1 - Math.pow(1 - t, 4);
      setDisplay(String(Math.round(ease * num)));
      if (step >= steps) { setDisplay(String(num)); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
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
          background: `radial-gradient(ellipse 120% 90% at 25% 35%, #D6E8DB 0%, #E4EDDF 35%, ${C.bg} 65%)`,
          padding: "56px 20px 72px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Subtle decorative elements */}
          <div className="r-hero-orb" style={{ position: "absolute", top: "10%", right: "5%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, #D6E8DB 0%, transparent 70%)", opacity: 0.5, pointerEvents: "none" }} />
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
                  Built for agencies, freelancers, consultants, and mobsters
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
                fontSize: 16, lineHeight: 1.7, color: C.textSec, marginBottom: 32,
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
                Rai pays attention to every client, every day.
              </h2>
              <p style={{ fontSize: 16, color: C.textSec, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
                When something shifts, she catches it — and tells you what to do about it.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { num: "01", title: "She sees it.", desc: "Cross-referencing tasks, health checks, score trends, 20+ combination signals — continuously, across your entire book.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> },
              { num: "02", title: "She puts it in front of you.", desc: "Every morning, before your first coffee. You don't go looking for the problem. The problem finds you without any trouble.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
              { num: "03", title: "She knows where it goes.", desc: "Using a proprietary scoring engine, Rai weighs all of the day's tasks by retention impact. Your highest-value move is next up.", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg> },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.15} style={{ flex: "1 1 300px", minWidth: 280 }}>
                <div className="r-rai-alert-wrap" style={{ borderRadius: 16 }}>
                <div style={{
                  padding: "28px 24px", borderRadius: 16, border: "1.5px solid " + C.borderLight,
                  background: C.card, cursor: "default",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ marginBottom: 14, opacity: 0.7 }}>{step.icon}</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, lineHeight: 1.25 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════ 5% STAT BAR ══════════════ */}
        <div className="r-full-bleed" style={{
          background: C.raiGrad, padding: "56px 20px",
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-grain" />
          {/* Decorative bar chart SVG */}
          <svg className="r-stat-graphic-right" style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 120, height: 80, opacity: 0.12 }} viewBox="0 0 120 80" fill="none">
            <rect x="0" y="55" width="16" height="25" rx="3" fill="white"/>
            <rect x="24" y="40" width="16" height="40" rx="3" fill="white"/>
            <rect x="48" y="25" width="16" height="55" rx="3" fill="white"/>
            <rect x="72" y="12" width="16" height="68" rx="3" fill="white"/>
            <rect x="96" y="0" width="16" height="80" rx="3" fill="white"/>
          </svg>
          <svg className="r-stat-graphic-left" style={{ position: "absolute", left: "8%", top: "50%", transform: "translateY(-50%)", width: 100, height: 80, opacity: 0.08 }} viewBox="0 0 100 80" fill="none">
            <circle cx="30" cy="20" r="14" fill="white"/>
            <path d="M30,34 C18,34 10,42 8,54 L8,80 L52,80 L52,54 C50,42 42,34 30,34Z" fill="white"/>
            <circle cx="68" cy="28" r="10" fill="white" opacity="0.7"/>
            <path d="M68,38 C60,38 54,44 52,52 L52,80 L84,80 L84,52 C82,44 76,38 68,38Z" fill="white" opacity="0.7"/>
          </svg>

          <h2 style={{
            fontSize: 26, fontWeight: 800, lineHeight: 1.25, textAlign: "center",
            margin: "0 auto", color: "#fff", letterSpacing: "-0.03em", position: "relative", zIndex: 2,
            maxWidth: 600,
          }}>
            A 5% increase in retention can boost profits by 95%.
            <sup style={{ fontSize: "0.35em", color: "rgba(255,255,255,0.3)", verticalAlign: "super" }}>¹</sup>
          </h2>

          {/* Fade separator */}
          <div style={{ width: 120, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", margin: "24px auto 0", position: "relative", zIndex: 2 }} />

          {/* Stats row */}
          <div className="r-stats-row" style={{ display: "flex", gap: 16, maxWidth: 1400, margin: "20px auto 0", position: "relative", zIndex: 2 }}>
            {[
              { num: "90", suffix: "%", label: "Of churn is predictable" },
              { num: "25", suffix: "x", label: "Cheaper to retain than acquire" },
              { num: "1", suffix: "+", label: "Saved client pays for itself" },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "16px 0" }}>
                <div className="r-stats" style={{
                  fontSize: 48, fontWeight: 900, letterSpacing: "-0.04em",
                  color: "#fff", lineHeight: 1, marginBottom: 6,
                }}>
                  <AnimatedStat value={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</div>
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

        {/* ══════════════ ENTERPRISE ══════════════ */}
        <div className="r-full-bleed" style={{
          background: C.heroGrad, padding: "64px 20px",
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-grain" />
          {/* Decorative geometric pattern */}
          <div style={{ position: "absolute", top: 40, right: 60, width: 200, height: 200, border: "1px solid rgba(255,255,255,0.04)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 60, right: 80, width: 160, height: 160, border: "1px solid rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />

          <Reveal><div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            {/* Top Secret stamp */}
            <div className="r-ent-stamp" style={{
              position: "absolute", top: -10, left: "8%",
              transform: "rotate(-6deg)",
              padding: "10px 30px", borderRadius: 4,
              border: "3px solid rgba(196,67,43,0.7)",
              color: "rgba(196,67,43,0.85)",
              fontSize: 18, fontWeight: 900, fontFamily: "'Courier New', Courier, monospace",
              textTransform: "uppercase", letterSpacing: "0.25em",
              pointerEvents: "none",
              boxShadow: "inset 0 0 0 1.5px rgba(196,67,43,0.35)",
            }}>Early Access</div>
            <h2 style={{
              fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff",
            }}>Autonomous relationship intelligence.</h2>
            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 580,
              margin: "0 auto 40px", lineHeight: 1.75,
            }}>Connect your platforms. Retayned scores every client, detects churn patterns, and tells your team — or your agents — exactly what to address, every morning, automatically.</p>

            <div className="r-ent-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40, maxWidth: 560, margin: "0 auto 40px" }}>
              {[
                { label: "Portfolio Sweeps", desc: "Every client scored and ranked automatically, every morning." },
                { label: "Churn Detection", desc: "Converging signals identified before they're cancellations." },
                { label: "Prioritized Task Lists", desc: "Specific actions, tailored to each client's communication style." },
                { label: "Useful Integrations", desc: "Slack, email, Zoom, CRM, billing — Retayned reads the data." },
              ].map(item => (
                <div key={item.label} className="r-ent-feature">
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#fff", marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="r-hero-cta" onClick={() => setPage("contact")} style={{
                background: "#fff", color: C.btn,
              }}>Let's Talk</button>
            </div>
          </div></Reveal>
        </div>

        {/* ══════════════ TESTIMONIALS ══════════════ */}
        <section style={{ padding: "48px 20px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>What Folks Are Saying</h2>
            <p style={{ fontSize: 16, color: C.textSec }}>From our own Retayned business.</p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
            {[
              { quote: "I used to lose 2-3 clients a year and just accept it as cost of doing business. Retayned showed me an actual pattern. It was the same signs every time and we just ignored them. Not anymore!", name: "Agency Owner", role: "50+ Clients", stars: 5, initials: "MK", color: "#558B68" },
              { quote: "It gave me the exact words to say to a client I was about to lose. I had the conversation that afternoon. They're still with me 8 months later. I'm still with Retayned.", name: "Solo Operator", role: "1-5 Clients", stars: 5, initials: "JR", color: "#5B21B6" },
              { quote: "The health check questions are uncomfortable in the best way. They force you to admit what you already know but haven't said out loud. It's something we thought we'd use for crises and it's turned into our daily operations hub.", name: "Freelance Consultant", role: "10-50 Clients", stars: 5, initials: null, color: "#92A596", beta: true },
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
          <div className="r-conf-inner" style={{ maxWidth: "100%", margin: "0 auto" }}>
            <img className="r-conf-img" src="/retayned-conference.jpg" alt="Retayned team at conference" style={{ width: "100%", display: "block", borderRadius: 0 }} />
          </div>
        </div>

        {/* ══════════════ FAQ + FINAL CTA ══════════════ */}
        <div className="r-full-bleed" style={{
          background: `linear-gradient(180deg, ${C.bg} 0%, #E4EDDF 8%, #D6E8DB 20%, #C8DDD0 34%, #B5CFBE 44%, #8FB89E 54%, #4A7B5E 66%, #2A462F 78%, #1E261F 90%)`,
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
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.6 }}>
              See the signal. Get the script. Keep the client.
            </p>
            <button className="r-hero-cta" onClick={() => setPage("signup")} style={{
              background: "#fff", color: C.btn, padding: "16px 40px", fontSize: 16,
              animation: "pulseGlow 3s ease-in-out infinite",
            }}>
              Start Free Trial
            </button>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>
              14-day free trial. Cancel anytime.
            </p>
          </div>

          {/* ── Inline Footer (inside gradient) ── */}
          <div style={{ padding: "32px 20px 24px", position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "baseline", cursor: "pointer" }} onClick={() => setPage("home")}>
                <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.04em", color: "rgba(255,255,255,0.7)" }}>Retayned</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: "rgba(255,255,255,0.7)", marginLeft: 1 }}>.</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>There's no "i" in Retayned.</div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              {[["platform","Platform"],["pricing","Pricing"],["about","About"],["faq","FAQs"],["contact","Contact"],["privacy","Privacy"],["terms","Terms"]].map(([id, label]) => (
                <span key={id} onClick={() => setPage(id)} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && setPage(id)} style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>{label}</span>
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
      <section style={{ padding: "56px 20px 40px", textAlign: "center" }}>
        <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 14 }}>One client saved pays for{" "}
          <span style={{ position: "relative", display: "inline-block", marginTop: "0.3em" }}>
            <span style={{ color: C.textMuted }}>a year<span style={{ position: "absolute", left: "-4%", top: "50%", height: "0.07em", background: C.danger, width: "108%", borderRadius: 2, transform: "rotate(-1deg)" }} /></span>
            <span style={{ position: "absolute", top: "-0.55em", left: "50%", transform: "translateX(-50%) rotate(-2deg)", fontFamily: "'Caveat', cursive", fontSize: "0.85em", fontWeight: 700, color: C.primary, whiteSpace: "nowrap" }}>years</span>
          </span>{" "}of Retayned.
        </h1>
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 24 }}>The math works. Still not convinced? 14-day free trial. Cancel anytime.</p>
      </section>
      <section style={{ padding: "0 20px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          {/* Cards side by side */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "stretch" }}>
            {/* Main pricing card */}
            <div style={{ flex: "1 1 400px", display: "flex" }}>
              <div style={{ background: `radial-gradient(ellipse 115% 60% at 50% 32%, #DCE9E0 0%, ${C.primarySoft} 35%, ${C.card} 78%)`, borderRadius: 20, border: "1.5px solid " + C.border, padding: "40px 32px", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.textMuted, marginBottom: 20, textAlign: "center" }}>One plan. Every feature. Impossibly easy.</div>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em" }}>$19.99</span>
                  <span style={{ fontSize: 15, color: C.textMuted }}>/mo</span>
                </div>
                <div style={{ fontSize: 16, color: C.textSec, marginBottom: 28, lineHeight: 1.5, textAlign: "center" }}>+ <span style={{ fontWeight: 700 }}>$1 per Client</span></div>
                <p style={{ fontSize: 14, color: C.textSec, textAlign: "center", marginBottom: 28 }}>Solve your business's most consequential problem for less than a Netflix subscription.</p>

                <button className="cta-btn" onClick={() => setPage("signup")} style={{ width: "100%", padding: "15px 20px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", background: C.btn, color: "#fff", border: "none", marginBottom: 28 }}>Start Free Trial</button>

                <div style={{ marginTop: "auto" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.primary, marginBottom: 16, textAlign: "center" }}>Everything's included</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["Suggested tasks daily", "Priority retention alerts", "Dynamic client scoring", "Monthly health checks", "Dedicated, priority support", "Unlimited chats with Rai", "Unlimited Rolodex slots", "Unlimited team members"].map((f, j) => (
                      <span key={j} style={{ fontSize: 13, color: C.text, padding: "8px 14px", borderRadius: 10, background: "rgba(51,84,62,0.06)", border: "1px solid " + C.borderLight, fontWeight: 500, textAlign: "center" }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise card */}
            <div style={{ flex: "1 1 400px", display: "flex" }}>
              <div style={{ background: `radial-gradient(ellipse 115% 60% at 50% 32%, #DCE9E0 0%, ${C.primarySoft} 35%, ${C.card} 78%)`, borderRadius: 20, border: "1.5px solid " + C.border, padding: "40px 32px", position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ position: "absolute", top: 28, right: -32, background: C.danger, color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 40px", transform: "rotate(45deg)", letterSpacing: ".06em", textAlign: "center" }}>EARLY ACCESS</div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.textMuted, marginBottom: 4 }}>Enterprise</div>
                <div style={{ fontSize: 14, color: C.textSec, marginBottom: 16 }}>Autonomous relationship intelligence.</div>
                <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 20 }}>Let's Talk</div>
                <button onClick={() => setPage("contact")} className="cta-btn" style={{ width: "100%", padding: "15px 20px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", marginBottom: 24, background: C.btn, color: "#fff", border: "none" }}>Contact Us</button>
                <div style={{ marginTop: "auto" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: C.primary, marginBottom: 16, textAlign: "center" }}>Built for large orgs and AI agents</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {["Slack, email, Zoom, CRM integrations", "Automated daily portfolio sweeps", "Churn archetype detection", "Prioritized client rankings", "Multi-signal alerts", "Score history and drift tracking", "API + webhook delivery", "Dedicated onboarding"].map((f, j) => (
                      <span key={j} style={{ fontSize: 13, color: C.text, padding: "6px 14px", borderRadius: 10, background: "rgba(51,84,62,0.06)", border: "1px solid " + C.borderLight, fontWeight: 500, textAlign: "center" }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 40%, #1E261F 100%)", padding: "64px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 14, color: "#fff" }}>You work too hard to get new clients.<br />Keep them Retayned.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.5)", marginBottom: 28, lineHeight: 1.6 }}>See the signal. Get the script. Keep the client.</p>
          <button className="cta-btn" onClick={() => setPage("signup")} style={{ padding: "16px 40px", background: "#fff", color: C.btn, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Start Free Trial</button>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
        </div>
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
        <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.65 }}>Retayned wasn't planned. We kept clients for 10+ years through COVID, work from home, digital transformation, fun AI, scary AI, and everything in between. We assumed what we were doing was normal. When we found out we were doing something genuinely special, we wanted to share it.</p>
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
      <section style={{ padding: "0 20px 40px" }}>
        <div style={{ background: C.heroGrad, borderRadius: 16, padding: "36px 28px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div className="r-grain" />
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "rgba(255,255,255,.35)", marginBottom: 12 }}>Washington, DC</div>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,.8)" }}>Based in the District, we're a small, focused team building a tool we want you to LOVE using. We want to help you turn client relationships into lifelong partnerships that matter and have real weight.</p>
        </div>
      </section>
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
function Blog() {
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
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", marginBottom: 16 }}>Start your 14-day free trial. Cancel anytime.</p>
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
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)" }}>You're on the list. We'll be in touch soon.</p>
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
              <p style={{ fontSize: 13, lineHeight: 1.55, color: "rgba(255,255,255,.75)" }}>{q.explain}</p>
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
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32 }}>Interactive tools to sharpen your retention instincts. Free. No sign-up required.</p>

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
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 40%, #1E261F 100%)", padding: "64px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12, color: "#fff", position: "relative", zIndex: 2 }}>Get notified when we publish!</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 320, margin: "0 auto" }}>
          <input style={{ width: "100%", padding: "12px 14px", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "rgba(255,255,255,0.08)", color: "#fff", outline: "none", boxSizing: "border-box" }} placeholder="you@agency.com" />
          <button className="cta-btn" style={{ width: "100%", padding: "12px 20px", background: "#fff", color: C.btn, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Subscribe</button>
        </div>
      </div>
    </>
  );
}
// ═══ DEMO ═══
function Demo() {
  return (
    <section style={{ padding: "48px 20px 48px", maxWidth: 640, margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Get a Demo</h1>
      <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32, lineHeight: 1.5 }}>Get a prerecorded demo of the Retayned platform!</p>
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
      <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32, lineHeight: 1.5 }}>Questions, feedback, partnerships, or just want to talk retention.</p>
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
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
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
        <span style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", color: C.primary }}>Retayned</span>
        <span style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginLeft: 1 }}>.</span>
      </div>
      <div style={{ background: C.card, borderRadius: 16, padding: "32px 24px", border: "1px solid " + C.border, boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>Start your free trial.</h1>
        <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24 }}>14 days free. No credit card required.</p>
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
        <p style={{ fontSize: 16, color: C.textSec, marginBottom: 32 }}>Everything you need to know about Retayned.</p>
        <FAQ />
      </section>
      <div className="r-full-bleed" style={{ background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 40%, #1E261F 100%)", padding: "56px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div className="r-grain" />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 14, color: "#fff" }}>Still have questions?</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>We'd love to hear from you.</p>
          <button onClick={() => setPage("contact")} className="cta-btn" style={{ padding: "14px 32px", background: "#fff", color: C.btn, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Contact Us</button>
        </div>
      </div>
    </>
  );
}

// ═══ PRIVACY ═══
function Privacy() {
  return (
    <section style={{ padding: "56px 20px 48px", margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 32 }}>Privacy Policy</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Last updated:</strong> April 2026</p>
        <p style={{ marginBottom: 20 }}>Retayned, operated by Maniac Digital, LLC ("Retayned," "we," "our," "us"), is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, store, and share information when you use the Retayned platform, website (retayned.com), and related services (collectively, the "Service").</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>1. Information We Collect</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Account Information.</strong> When you register, we collect your name, email address, company name, and billing information. If you sign up via Google OAuth, we receive your name and email from Google. We do not store your Google password.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Client Data.</strong> You may enter client names, contact information, relationship profiles, health check responses, billing records, notes, and other client-related data into the Service ("Client Data"). You control what Client Data you provide.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Integration Data.</strong> When you connect third-party integrations (Gmail, Google Calendar, Slack, Zoom, or others), we access metadata such as timestamps, sender/recipient identifiers, meeting frequency, and response latency. We do not read, store, or process the content of your emails, messages, or meeting transcripts. We access only the metadata necessary to calculate communication velocity and engagement signals.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Usage Data.</strong> We automatically collect information about how you interact with the Service, including pages viewed, features used, session duration, device type, browser type, IP address, and referring URLs.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Cookies and Tracking.</strong> We use essential cookies to maintain your session and preferences. We use analytics tools to understand usage patterns. We do not use third-party advertising cookies. You may disable non-essential cookies through your browser settings.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>2. How We Use Your Information</strong></p>
        <p style={{ marginBottom: 8 }}>We use the information we collect to: provide, operate, and maintain the Service; generate retention scores, health assessments, and AI-powered recommendations through Rai; calculate communication velocity and engagement signals from integration metadata; process payments and manage your subscription; send transactional communications (account confirmations, billing notices, security alerts); respond to support requests; improve the Service based on aggregated, anonymized usage patterns; and comply with legal obligations.</p>
        <p style={{ marginBottom: 20 }}>We do not sell, rent, or lease your personal information or Client Data to third parties. We do not use your Client Data for advertising purposes.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>3. AI and Data Processing</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>How Rai Works.</strong> Retayned's AI advisor ("Rai") processes your Client Data — including relationship profiles, health check responses, billing data, and integration metadata — to generate personalized recommendations, retention scores, and suggested actions. Rai is powered by third-party AI models accessed via API (currently Anthropic's Claude). Your Client Data is sent to these AI providers solely to generate responses within your session.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>No Model Training.</strong> We do not use your Client Data to train, fine-tune, or improve any AI or machine learning models — ours or any third party's. Your data is used exclusively to provide the Service to you. Our AI API providers are contractually prohibited from using your data for model training.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Data Minimization.</strong> We send only the minimum Client Data necessary for Rai to generate relevant recommendations. We do not send your full account data, billing information, or credentials to AI providers.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>4. Data Sharing and Third Parties</strong></p>
        <p style={{ marginBottom: 8 }}>We share information only in the following circumstances: with service providers who help us operate the Service (hosting, payment processing, AI API providers, analytics), subject to contractual obligations to protect your data; with your consent or at your direction; to comply with applicable law, regulation, legal process, or governmental request; to protect the rights, safety, or property of Retayned, our users, or the public; and in connection with a merger, acquisition, or sale of assets, in which case you will be notified of any change in data practices.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Key Service Providers.</strong> Hosting and infrastructure: Railway / cloud providers (United States). Payment processing: Stripe. AI API: Anthropic. Authentication: Supabase. Analytics: privacy-respecting analytics tools.</p>
        <p style={{ marginBottom: 20 }}>All service providers are bound by data processing agreements and are prohibited from using your data for their own purposes.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>5. Data Security</strong></p>
        <p style={{ marginBottom: 20 }}>We implement industry-standard security measures to protect your data, including: encryption of data in transit (TLS 1.2+) and at rest (AES-256); secure authentication with password hashing and optional OAuth; access controls limiting employee access to production data; regular security reviews of our infrastructure and dependencies; and secure API communication with all third-party providers. No method of transmission or storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>6. Data Retention and Deletion</strong></p>
        <p style={{ marginBottom: 8 }}>We retain your account information and Client Data for as long as your account is active. If you cancel your subscription, your data will be retained in an inactive state for 30 days to allow for reactivation, after which it will be permanently deleted within 90 days. You may request immediate deletion of your account and all associated data at any time by contacting privacy@retayned.com. Certain data may be retained as required by law (e.g., billing records for tax purposes) even after account deletion.</p>
        <p style={{ marginBottom: 20 }}>Anonymized, aggregated data that cannot be used to identify you or your clients may be retained indefinitely for product improvement purposes.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>7. Your Rights</strong></p>
        <p style={{ marginBottom: 8 }}>Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal information; export your Client Data in a portable format; restrict or object to certain processing of your data; withdraw consent where processing is based on consent; and lodge a complaint with a supervisory authority.</p>
        <p style={{ marginBottom: 20 }}>To exercise any of these rights, contact us at privacy@retayned.com. We will respond within 30 days.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>8. International Data Transfers</strong></p>
        <p style={{ marginBottom: 20 }}>Retayned is based in Washington, DC, United States. If you access the Service from outside the United States, your information may be transferred to, stored, and processed in the United States. By using the Service, you consent to the transfer of your information to the United States, where data protection laws may differ from those in your jurisdiction.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>9. Children's Privacy</strong></p>
        <p style={{ marginBottom: 20 }}>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>10. Changes to This Policy</strong></p>
        <p style={{ marginBottom: 20 }}>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on the Service and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the updated policy.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>11. Contact Us</strong></p>
        <p>If you have questions about this Privacy Policy or our data practices, contact us at: privacy@retayned.com — Maniac Digital, LLC, Washington, DC, United States.</p>
      </div>
    </section>
  );
}

// ═══ TERMS ═══
function Terms() {
  return (
    <section style={{ padding: "48px 20px 48px", margin: "0 auto", minHeight: "calc(100vh - 160px)" }}>
      <h1 className="r-page-title" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 32 }}>Terms of Service</h1>
      <div style={{ fontSize: 14, color: C.textSec, lineHeight: 1.7 }}>
        <p style={{ marginBottom: 12 }}><strong style={{ color: C.text }}>Last updated:</strong> April 2026</p>
        <p style={{ marginBottom: 20 }}>These Terms of Service ("Terms") govern your access to and use of the Retayned platform, website, and related services (collectively, the "Service") provided by Maniac Digital, LLC ("Retayned," "we," "our," "us"). By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>1. Eligibility and Account</strong></p>
        <p style={{ marginBottom: 8 }}>You must be at least 18 years old and have the legal authority to enter into these Terms. If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify us immediately of any unauthorized use of your account.</p>
        <p style={{ marginBottom: 20 }}>You agree to provide accurate, current, and complete information during registration and to keep your account information updated.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>2. The Service</strong></p>
        <p style={{ marginBottom: 8 }}>Retayned provides client relationship management tools including AI-powered retention scoring, communication signal analysis, health check assessments, suggested daily actions, a client relationship advisor ("Rai"), and related features. The Service is designed to help you manage and strengthen client relationships. We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice.</p>
        <p style={{ marginBottom: 20 }}>The Service may include integrations with third-party platforms (Gmail, Google Calendar, Slack, Zoom, and others). Your use of these integrations is also subject to the terms and privacy policies of those third-party providers.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>3. Your Data</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Ownership.</strong> You retain full ownership of all data you enter into the Service, including client information, relationship profiles, health check responses, billing records, notes, and any other content you provide ("Your Data"). We do not claim any intellectual property rights over Your Data.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>License to Us.</strong> You grant Retayned a limited, non-exclusive, worldwide license to use, process, and store Your Data solely for the purpose of providing and improving the Service. This license terminates when you delete your account or Your Data.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Data Portability.</strong> You may export Your Data at any time while your account is active. Upon account termination, you may request an export within 30 days before permanent deletion.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Your Responsibilities.</strong> You are responsible for the accuracy and legality of Your Data. You represent that you have the right to enter client information into the Service and that doing so does not violate any confidentiality agreement, privacy law, or other obligation. You are responsible for obtaining any necessary consents from your clients regarding the storage and processing of their information.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>4. AI-Powered Features</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Rai and AI Outputs.</strong> The Service includes AI-powered features, including the Rai advisor, retention scoring, and suggested actions. These features are powered by third-party AI models accessed via API. AI-generated recommendations, scores, scripts, and suggestions ("AI Outputs") are provided for informational purposes only and do not constitute professional advice of any kind — including legal, financial, or business advice.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>No Guarantees.</strong> AI Outputs are generated based on the data you provide and may not be accurate, complete, or appropriate for your specific situation. You are solely responsible for evaluating and acting on AI Outputs. Retayned does not guarantee any specific business outcome, client retention rate, or revenue result from using the Service or following AI Outputs.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>No Training on Your Data.</strong> We do not use Your Data to train, fine-tune, or improve any AI or machine learning models. Your Data is processed in real-time to generate responses and is not retained by our AI providers beyond the duration of the API request, in accordance with their data processing agreements.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Human Oversight.</strong> You acknowledge that all actions taken based on AI Outputs are your own decisions. You should exercise your own professional judgment before acting on any recommendation provided by the Service.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>5. Payment and Billing</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Subscription Plans.</strong> The Service is offered on a subscription basis. Current pricing is displayed on our pricing page. Prices are subject to change with 30 days' notice. Subscription fees are non-refundable except as described below.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Free Trial.</strong> We may offer a free trial period. At the end of the trial, your subscription will begin automatically unless you cancel before the trial ends. We will notify you before charging.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Billing.</strong> Fees are billed in advance on a monthly or annual basis, depending on your chosen plan. Payment is processed through Stripe. You authorize us to charge your payment method on file for all applicable fees.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Cancellation.</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. You will retain access to the Service until then. We do not provide prorated refunds for partial billing periods.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Refunds.</strong> If you are dissatisfied with the Service, you may request a refund within 14 days of your first paid subscription charge. Refund requests after 14 days are handled at our discretion.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>6. Acceptable Use</strong></p>
        <p style={{ marginBottom: 8 }}>You agree not to: use the Service for any unlawful purpose or in violation of any applicable law; upload or transmit malicious code, viruses, or harmful data; attempt to gain unauthorized access to the Service, other accounts, or our systems; interfere with or disrupt the Service or its infrastructure; resell, sublicense, or redistribute the Service without our written consent; use the Service to store or process data that violates any person's privacy rights; use automated tools (bots, scrapers) to access the Service except through our published APIs; or use the Service to harass, abuse, or harm any person.</p>
        <p style={{ marginBottom: 20 }}>We reserve the right to suspend or terminate your account for violations of these terms, with notice where practicable.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>7. Intellectual Property</strong></p>
        <p style={{ marginBottom: 8 }}>The Service, including its design, code, features, documentation, branding, and all related intellectual property, is owned by Maniac Digital, LLC. You may not copy, modify, distribute, or create derivative works based on the Service without our written permission.</p>
        <p style={{ marginBottom: 20 }}>The Retayned name, logo, "Rai," and related marks are trademarks of Maniac Digital, LLC. You may not use our trademarks without prior written consent.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>8. Limitation of Liability</strong></p>
        <p style={{ marginBottom: 8 }}>To the maximum extent permitted by law, Retayned and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of revenue, lost profits, loss of clients, loss of data, or business interruption, arising out of or related to your use of the Service — whether based on warranty, contract, tort, or any other legal theory, even if we have been advised of the possibility of such damages.</p>
        <p style={{ marginBottom: 20 }}>Our total aggregate liability for all claims arising out of or related to the Service shall not exceed the total amount you paid to us in the twelve (12) months preceding the claim. Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>9. Disclaimer of Warranties</strong></p>
        <p style={{ marginBottom: 20 }}>The Service is provided "as is" and "as available" without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or secure; that AI Outputs will be accurate, reliable, or suitable for your needs; that any defects will be corrected; or that the Service will meet your specific requirements or expectations.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>10. Indemnification</strong></p>
        <p style={{ marginBottom: 20 }}>You agree to indemnify, defend, and hold harmless Retayned and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: your use of the Service; Your Data or your violation of any third party's rights; your violation of these Terms; or any actions you take based on AI Outputs.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>11. Termination</strong></p>
        <p style={{ marginBottom: 8 }}>Either party may terminate these Terms at any time. You may terminate by canceling your subscription and deleting your account. We may terminate or suspend your access to the Service immediately, without prior notice, for conduct that we determine violates these Terms, is harmful to other users or the Service, or is otherwise objectionable.</p>
        <p style={{ marginBottom: 20 }}>Upon termination, your right to use the Service ceases immediately. Sections that by their nature should survive termination — including ownership, warranty disclaimers, indemnification, and limitation of liability — shall survive.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>12. Dispute Resolution</strong></p>
        <p style={{ marginBottom: 20 }}>These Terms are governed by the laws of the District of Columbia, United States, without regard to conflict of law provisions. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration administered in Washington, DC, except that either party may seek injunctive relief in any court of competent jurisdiction. You agree to resolve disputes on an individual basis and waive any right to participate in a class action.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>13. Changes to These Terms</strong></p>
        <p style={{ marginBottom: 20 }}>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on the Service, sending an email to your registered address, or through an in-app notification. Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms. If you do not agree to the updated Terms, you must stop using the Service.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>14. General Provisions</strong></p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Entire Agreement.</strong> These Terms, together with the Privacy Policy, constitute the entire agreement between you and Retayned regarding the Service.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Severability.</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ color: C.text }}>Waiver.</strong> Our failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</p>
        <p style={{ marginBottom: 20 }}><strong style={{ color: C.text }}>Assignment.</strong> You may not assign your rights under these Terms without our consent. We may assign our rights at any time without notice.</p>

        <p style={{ marginBottom: 6 }}><strong style={{ color: C.text, fontSize: 16 }}>15. Contact Us</strong></p>
        <p>If you have questions about these Terms, contact us at: legal@retayned.com — Maniac Digital, LLC, Washington, DC, United States.</p>
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
        <div className="r-full-bleed" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, " + C.primarySoft + " 0%, " + C.bg + " 80%)",
          padding: "48px 20px 24px",
        }}>
          <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
            <h1 style={{
              fontSize: 36, fontWeight: 900, lineHeight: 1.1, marginBottom: 12,
              letterSpacing: "-0.04em",
            }}>
              Your clients won't know Retayned exists.<br />
              <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, color: C.primary }}>They'll just stay.</span>
            </h1>
            <p style={{ fontSize: 16, color: C.textSec, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Relationship intelligence, health monitoring, and pipeline management in one system. Our AI isn't just smart — it's <strong style={{ color: C.text }}>emotionally intelligent</strong>.
            </p>
          </div>

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



        {/* ══════ Meet the Brains ══════ */}
        <div className="r-full-bleed" style={{ background: C.heroGrad, padding: "64px 20px 64px", position: "relative", overflow: "hidden" }}>
          <div className="r-grain" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "5%", right: "8%", width: 250, height: 250, border: "1px solid rgba(255,255,255,0.03)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 180, height: 180, border: "1px solid rgba(255,255,255,0.02)", borderRadius: "50%", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <Reveal><div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", marginBottom: 12, letterSpacing: "-0.03em" }}>Meet the Brains of the Operation</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
                You have 15 clients. You're focused on the three that are screaming. Rai is watching the other twelve.
              </p>
            </div></Reveal>

            {/* Step 1 */}
            <Reveal direction="left"><div className="r-rai-step-card" style={{ marginBottom: 20, maxWidth: 680 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.primaryLight, textTransform: "uppercase", letterSpacing: ".1em" }}>01 — Signal Detection</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>She sees it.</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Cross-referencing health checks, score trends, billing patterns, and 20 combination signals — continuously, across your entire book.</p>
              <div style={{ background: C.card, borderRadius: 14, border: "1px solid " + C.border, padding: "18px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.danger, animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: ".06em" }}>Live — scanning 15 clients</span>
                </div>
                {[
                  { name: "Broadleaf Media", score: 65, signals: ["78 → 65", "combo: no_room", "11d silent", "rate↑ no call"], status: "critical" },
                  { name: "Foxglove Partners", score: 38, signals: ["42 → 38", "HC overdue", "velocity: cold"], status: "critical" },
                  { name: "Northvane Studios", score: 91, signals: ["91 stable", "renewed", "weekly calls"], status: "clear" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? "1px solid " + C.borderLight : "none", opacity: c.status === "clear" ? 0.4 : 1 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: c.status === "critical" ? C.danger + "12" : C.success + "12", border: "1.5px solid " + (c.status === "critical" ? C.danger + "30" : C.success + "30"), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: c.status === "critical" ? C.danger : C.success, flexShrink: 0 }}>{c.score}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3 }}>{c.name}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {c.signals.map(s => (
                          <span key={s} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 5, background: c.status === "critical" ? C.danger + "10" : C.primarySoft, color: c.status === "critical" ? C.danger : C.primary, fontWeight: 600 }}>{s}</span>
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
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)" }} />
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>↓</div>
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            {/* Step 2 */}
            <Reveal delay={0.15}><div className="r-rai-step-card" style={{ maxWidth: 680, margin: "0 auto 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.warning, textTransform: "uppercase", letterSpacing: ".1em" }}>02 — Action Delivery</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>She puts it in front of you.</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Every morning, before your first coffee. You don't go looking for the problem. The problem finds you.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.primaryLight, textTransform: "uppercase", letterSpacing: ".04em" }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" stroke={C.primaryLight} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg>
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
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)" }} />
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>↓</div>
                <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>

            {/* Step 3 */}
            <Reveal direction="right" delay={0.3}><div className="r-rai-step-card" style={{ maxWidth: 680, marginLeft: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.btn, textTransform: "uppercase", letterSpacing: ".1em" }}>03 — Priority Engine</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>She knows where it goes.</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 22, maxWidth: 560 }}>Using a proprietary scoring engine, Rai weighs all of the day's tasks by retention impact. Your highest-value move is next up.</p>
              <div style={{ background: C.card, borderRadius: 14, border: "1px solid " + C.border, padding: "18px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 12 }}>Your Tasks</div>
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
                      <div style={{ width: 28, height: 28, borderRadius: 7, border: "1.5px solid " + C.border, flexShrink: 0 }} />
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
          </div>
        </div>

        {/* ══════ Scoring Model ══════ */}
        <section style={{ padding: "64px 20px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><div className="r-section-head" style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: ".14em",
                color: C.primary, marginBottom: 14,
                padding: "5px 14px", borderRadius: 6,
                background: C.primarySoft,
              }}>The Scoring Model</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>Twelve questions that predict whether a client stays</h2>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
                Not surveys. Not NPS. Twelve specific dimensions about trust, loyalty, expectations, and grace — answered by you, about each client.
              </p>
            </div></Reveal>

            {/* Dimension strip */}
            <div style={{ overflow: "hidden", marginBottom: 56, padding: "20px 0", position: "relative" }}>
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

            {/* Combination Signals */}
            <Reveal><div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".1em", color: C.textMuted, marginBottom: 8 }}>Combination Signals</div>
              <p style={{ fontSize: 14, color: C.textSec, maxWidth: 500, margin: "0 auto" }}>When dimensions collide, patterns emerge. 20 proprietary combinations predict behavior no single metric catches.</p>
            </div></Reveal>

            <div className="r-combo-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, maxWidth: 600, margin: "0 auto" }}>
              {[
                { name: "Bulletproof", a: "Loyalty", b: "Grace", desc: "Will survive your worst month.", type: "pos" },
                { name: "Locked Vault", a: "Loyalty", b: "Depth", desc: "Double lock on the door.", type: "pos" },
                { name: "Ice Wall", a: "Trust", b: "Tone", desc: "Polite but completely shut down.", type: "neg" },
                { name: "On the Clock", a: "Trust", b: "Loyalty", desc: "They've mentally left already.", type: "neg" },
                { name: "Silent Exit", a: "Stress", b: "Depth", desc: "No warning before the email.", type: "neg" },
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
                    <div style={{ fontSize: 12, color: C.textSec, lineHeight: 1.45 }}>{combo.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button className="r-hero-cta cta-btn" onClick={() => setPage("signup")} style={{ padding: "13px 28px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Try Free Now 
              </button>
            </div>
          </div>
        </section>

        {/* ══════ Philosophy Quote ══════ */}
        <div className="r-full-bleed" style={{ background: C.heroGrad, padding: "64px 20px", position: "relative" }}>
          <div className="r-grain" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
          <Reveal><div style={{ margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".1em", color: "rgba(255,255,255,.25)", marginBottom: 18 }}>As Rai Sees It</div>
            <blockquote style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.45, letterSpacing: "-0.02em", margin: 0, color: "#fff", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>"The conversation you're avoiding is the one that saves the account."</blockquote>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", marginTop: 18, lineHeight: 1.6 }}>Rai doesn't help you avoid hard conversations. She helps you have them.</p>
          </div></Reveal>
        </div>

        {/* ══════ Enterprise ══════ */}
        <section style={{ padding: "64px 20px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
            <Reveal direction="left"><div style={{ flex: "1 1 340px" }}>
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: ".14em",
                color: C.btn, marginBottom: 14,
                padding: "5px 14px", borderRadius: 6,
                background: "rgba(91,33,182,0.06)",
              }}>Early Access</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 16 }}>Autonomous relationship intelligence.</h2>
              <p style={{ fontSize: 15, color: C.textSec, lineHeight: 1.75, marginBottom: 28 }}>
                Connects to your communication and billing platforms, monitors every client relationship automatically, and delivers prioritized actions to your team or your AI agents every morning.
              </p>
              <button className="r-hero-cta cta-btn" onClick={() => setPage("contact")} style={{ padding: "13px 28px", background: C.btn, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Let's Talk 
              </button>
            </div></Reveal>
            <Reveal direction="right" delay={0.2}><div style={{ flex: "1 1 360px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[
                { label: "Portfolio Sweeps", desc: "Every client scored and ranked automatically, every morning." },
                { label: "Churn Detection", desc: "Converging signals identified before they're cancellations." },
                { label: "Prioritized Task Lists", desc: "Specific actions, tailored to each client's communication style." },
                { label: "Useful Integrations", desc: "Slack, email, Zoom, CRM, billing — Retayned reads the data." },
              ].map(item => (
                <div key={item.label} style={{ padding: 20, background: C.card, borderRadius: 14, border: "1px solid " + C.border, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", transition: "all 0.25s ease" }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 5 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: C.textSec, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div></Reveal>
          </div>
        </section>

        {/* ══════ FAQs ══════ */}
        <div className="r-full-bleed" style={{ background: C.primarySoft, padding: "48px 20px 56px" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto" }}>
            <h2 style={{ fontSize: 30, fontWeight: 800, textAlign: "center", marginBottom: 24 }}>FAQs</h2>
            <FAQ fullBleed />
          </div>
        </div>

        {/* ══════ Final CTA ══════ */}
        <div className="r-full-bleed" style={{
          background: "linear-gradient(135deg, #DAE8DF 0%, #4A7B5E 40%, #1E261F 100%)",
          padding: "64px 20px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div className="r-grain" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: "-0.03em", color: "#fff" }}>
              You work too hard to get new clients.<br />Keep them Retayned.
            </h2>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", marginBottom: 28, lineHeight: 1.6 }}>See the signal. Get the script. Keep the client.</p>
            <button className="cta-btn" onClick={() => setPage("signup")} style={{
              padding: "16px 40px", background: "#fff", color: C.btn, border: "none",
              borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
            }}>
              Start Free Trial
            </button>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>14-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </>
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
        .r-page-title { }
        input[type=range] { -webkit-appearance: none; width: 100%; height: 8px; border-radius: 4px; background: #E8ECE6; outline: none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; box-shadow: 0 2px 8px rgba(91,33,182,0.3); }
        input[type=range]::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: #5B21B6; cursor: pointer; border: none; }
        .r-conf-inner { border-radius: 0; }
        .r-conf-img { border-radius: 0; }
        .r-tab-btn { flex: 0 0 auto !important; }
        .r-feat-content { flex-direction: column-reverse; gap: 24px !important; }
        .r-feat-heading-mobile { display: block !important; }
        .r-feat-heading-desktop { display: none !important; }
        .r-ent-stamp { top: -30px !important; left: 50% !important; transform: translateX(-50%) rotate(-6deg) !important; font-size: 13px !important; padding: 8px 20px !important; }
        .r-hero-bg { background: linear-gradient(180deg, #D6E8DB 0%, #E4EDDF 40%, #F7F7F4 75%) !important; }
        .r-hero-orb { opacity: 0.4 !important; }
        .r-hero-section { padding-bottom: 48px !important; }
        .r-how-it-works { padding-top: 32px !important; }
        .r-feat-section { padding-bottom: 64px !important; }
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
          .r-ent-grid { grid-template-columns: 1fr 1fr 1fr 1fr !important; max-width: 960px !important; }
          .r-feat-content { flex-direction: row !important; gap: 48px !important; }
          .r-feat-heading-mobile { display: none !important; }
          .r-feat-heading-desktop { display: block !important; }
          .r-hero-bg { background: radial-gradient(ellipse 120% 90% at 25% 35%, #D6E8DB 0%, #E4EDDF 35%, #F7F7F4 65%) !important; }
          .r-hero-orb { opacity: 0.5 !important; }
          .r-stats-row { flex-direction: row !important; gap: 16px !important; }

          .r-conf-inner { max-width: 900px; border-radius: 14px; overflow: hidden; }
          .r-conf-img { border-radius: 14px; }
          .r-conf { padding: 0 40px !important; margin-bottom: 64px !important; }
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
      `}</style>

      <Nav page={page} setPage={setPage} />
      <div style={{ overflowX: "hidden" }}>
      <div className="r-wrap">
        {page === "home" && <Home setPage={setPage} />}
        {page === "platform" && <Platform setPage={setPage} />}
        {page === "pricing" && <Pricing setPage={setPage} />}
        {page === "about" && <About setPage={setPage} />}
        {page === "faq" && <FAQPage setPage={setPage} />}
        {page === "blog" && <Blog />}
        {page === "contact" && <Contact />}
        {page === "demo" && <Demo />}
        {page === "login" && <Login setPage={setPage} />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "privacy" && <Privacy />}
        {page === "terms" && <Terms />}
      </div>
      {page !== "home" && <Footer setPage={setPage} />}
      </div>
    </div>
  );
}
