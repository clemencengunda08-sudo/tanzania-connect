import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# ═══════════════════════════════════════════════════════════════
# COLOR PALETTE: TANZANIA REACH & ALTRAWARE TECH LUXURY THEME
# ═══════════════════════════════════════════════════════════════
DEEP_EMERALD = colors.HexColor("#064E3B") # Tanzania Green
GOLD_TANZANIA = colors.HexColor("#F59E0B") # Tanzania Mineral Gold
OCEAN_BLUE = colors.HexColor("#0284C7") # Indian Ocean Blue
NAVY_DARK = colors.HexColor("#0F172A")
DARK_SLATE = colors.HexColor("#1E293B")
TEXT_MUTED = colors.HexColor("#64748B")
BG_LIGHT = colors.HexColor("#F8FAFC")
BG_CARD = colors.HexColor("#F1F5F9")
BORDER_COLOR = colors.HexColor("#CBD5E1")
BORDER_ACCENT = colors.HexColor("#34D399")

DOCS_DIR = r"C:\Users\MWIJAY TECH\Desktop\PROJECTS\tanzania-connect-e2f568e3c088d803a16e4558551e272c9897af11\docs"

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        if self._pageNumber == 1 or self._pageNumber == page_count:
            return

        self.saveState()
        
        # Header
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(DEEP_EMERALD)
        self.drawString(54, 11 * 72 - 34, "TANZANIA REACH")
        
        self.setFont("Helvetica", 7.5)
        self.setFillColor(TEXT_MUTED)
        self.drawString(135, 11 * 72 - 34, "— Intelligence Portal for Life, Business & Investment")
        
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(NAVY_DARK)
        self.drawRightString(8.5 * 72 - 54, 11 * 72 - 34, "ALTRAWARE TECH")
        
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(54, 11 * 72 - 40, 8.5 * 72 - 54, 11 * 72 - 40)

        # Footer
        self.setFont("Helvetica", 7.5)
        self.setFillColor(TEXT_MUTED)
        self.drawString(54, 34, "Confidential & Proprietary • Tanzania Reach Intelligence Portal")
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(NAVY_DARK)
        self.drawRightString(8.5 * 72 - 54, 34, page_str)
        
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(54, 44, 8.5 * 72 - 54, 44)
        
        self.restoreState()


def get_custom_styles():
    base = getSampleStyleSheet()
    return {
        'cover_super': ParagraphStyle(
            'CoverSuper', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=DEEP_EMERALD, alignment=1, spaceAfter=8
        ),
        'cover_title': ParagraphStyle(
            'CoverTitle', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=26, leading=30, textColor=NAVY_DARK, alignment=1, spaceAfter=8
        ),
        'cover_subtitle': ParagraphStyle(
            'CoverSubtitle', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=DEEP_EMERALD, alignment=1, spaceAfter=15
        ),
        'cover_desc': ParagraphStyle(
            'CoverDesc', parent=base['Normal'], fontName='Helvetica', fontSize=9.5, leading=14, textColor=TEXT_MUTED, alignment=1, spaceAfter=25
        ),
        'h1': ParagraphStyle(
            'H1', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=13, leading=17, textColor=NAVY_DARK, spaceBefore=14, spaceAfter=6, keepWithNext=True
        ),
        'h2': ParagraphStyle(
            'H2', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=DEEP_EMERALD, spaceBefore=10, spaceAfter=4, keepWithNext=True
        ),
        'body': ParagraphStyle(
            'Body', parent=base['Normal'], fontName='Helvetica', fontSize=9, leading=13, textColor=DARK_SLATE, spaceAfter=5
        ),
        'diagram_text': ParagraphStyle(
            'DiagramText', parent=base['Normal'], fontName='Courier-Bold', fontSize=7.5, leading=10, textColor=NAVY_DARK
        ),
        'table_header': ParagraphStyle(
            'TableHeader', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10.5, textColor=colors.white
        ),
        'table_cell': ParagraphStyle(
            'TableCell', parent=base['Normal'], fontName='Helvetica', fontSize=8, leading=10.5, textColor=DARK_SLATE
        ),
        'toc_num': ParagraphStyle(
            'TOCNum', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=DEEP_EMERALD
        ),
        'back_title': ParagraphStyle(
            'BackTitle', parent=base['Normal'], fontName='Helvetica-Bold', fontSize=20, leading=24, textColor=NAVY_DARK, alignment=1, spaceAfter=10
        ),
        'back_body': ParagraphStyle(
            'BackBody', parent=base['Normal'], fontName='Helvetica', fontSize=9, leading=13, textColor=DARK_SLATE, alignment=1, spaceAfter=15
        )
    }


def append_cover_page(story, styles, doc_type_title, doc_badge, description_text):
    story.append(Spacer(1, 25))
    story.append(Paragraph("THE INDEPENDENT INTELLIGENCE PORTAL", styles['cover_super']))
    story.append(Paragraph("TANZANIA REACH", styles['cover_title']))
    story.append(Paragraph(doc_type_title.upper(), styles['cover_subtitle']))
    
    badge_table = Table([[
        Paragraph(f"<b>DELIVERED BY: ALTRAWARE TECH</b> &nbsp;|&nbsp; <b>{doc_badge}</b>", ParagraphStyle(
            'BadgeText', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.white, alignment=1
        ))
    ]], colWidths=[504])
    badge_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), DEEP_EMERALD),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(badge_table)
    story.append(Spacer(1, 15))
    
    story.append(Paragraph(description_text, styles['cover_desc']))
    story.append(Spacer(1, 10))
    
    meta_data = [
        [
            Paragraph("<b>Project Name:</b> Tanzania Reach Portal", styles['table_cell']),
            Paragraph("<b>Live Web:</b> https://www.tanzaniareach.com", styles['table_cell']),
            Paragraph("<b>Version:</b> v0.1.0-beta", styles['table_cell'])
        ],
        [
            Paragraph("<b>Target Audience:</b> Investors, Expats, Executives", styles['table_cell']),
            Paragraph("<b>Sector Guides:</b> 18 Complete Sectors", styles['table_cell']),
            Paragraph("<b>Date:</b> September 2026", styles['table_cell'])
        ],
        [
            Paragraph("<b>Architect:</b> Altraware Tech Lead Team", styles['table_cell']),
            Paragraph("<b>Stack:</b> Next.js 15, Firebase, Genkit AI", styles['table_cell']),
            Paragraph("<b>Status:</b> 🟢 Live Beta", styles['table_cell'])
        ]
    ]
    t_meta = Table(meta_data, colWidths=[168, 172, 164])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 25))
    
    disclaimer_box = Table([[
        Paragraph(
            "<b>CONFIDENTIALITY & PROPRIETARY NOTICE:</b> This document contains proprietary system design, sector data taxonomies, and technical specifications for <b>Tanzania Reach</b>, engineered by <b>Altraware Tech</b>. All content, schemas, and architecture frameworks are protected under copyright.",
            ParagraphStyle('Disc', fontName='Helvetica', fontSize=7.5, leading=10.5, textColor=TEXT_MUTED, alignment=1)
        )
    ]], colWidths=[504])
    disclaimer_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(disclaimer_box)
    story.append(PageBreak())


def append_back_page(story, styles, doc_title_type):
    story.append(Spacer(1, 40))
    story.append(Paragraph("TANZANIA REACH", styles['back_title']))
    story.append(Paragraph(f"Official {doc_title_type} & Product Blueprint", ParagraphStyle(
        'BackSub', fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=DEEP_EMERALD, alignment=1, spaceAfter=15
    )))
    
    story.append(Paragraph(
        "Tanzania Reach is the authoritative digital intelligence gateway for navigating foreign investment, "
        "regulatory compliance, living, and commerce across Tanzania. Delivered with uncompromising engineering "
        "standards, edge performance, and verified data by <b>Altraware Tech</b>.",
        styles['back_body']
    ))
    story.append(Spacer(1, 15))
    
    contact_data = [
        [
            Paragraph("<b>ENGINEERING PARTNER</b>", styles['table_header']),
            Paragraph("<b>EDITORIAL PLATFORM</b>", styles['table_header']),
            Paragraph("<b>DIGITAL COMMUNICATIONS</b>", styles['table_header'])
        ],
        [
            Paragraph("<b>Altraware Tech</b><br/>Lead Systems & AI Engineering<br/>Dar es Salaam, Tanzania", styles['table_cell']),
            Paragraph("<b>Tanzania Reach Directorate</b><br/>Economic Intelligence Portal<br/>Dar es Salaam & Arusha", styles['table_cell']),
            Paragraph("<b>Web:</b> www.tanzaniareach.com<br/><b>Admin Portal:</b> /p-access<br/><b>Deployment:</b> Firebase App Hosting", styles['table_cell'])
        ]
    ]
    t_contact = Table(contact_data, colWidths=[168, 168, 168])
    t_contact.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('BACKGROUND', (0,1), (-1,-1), BG_CARD),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_contact)
    story.append(Spacer(1, 30))
    
    seals = Table([
        [
            Paragraph("<b>SYSTEMS ARCHITECT</b><br/><br/>_______________________________<br/><b>Lead Solutions Architect</b><br/>Altraware Tech", styles['table_cell']),
            Paragraph("<b>EDITORIAL DIRECTOR</b><br/><br/>_______________________________<br/><b>Managing Director</b><br/>Tanzania Reach", styles['table_cell'])
        ]
    ], colWidths=[252, 252])
    seals.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(seals)
    story.append(Spacer(1, 20))
    
    story.append(Paragraph(
        "© 2026 Altraware Tech & Tanzania Reach. All Rights Reserved. Version v0.1.0-beta.",
        ParagraphStyle('Copy', fontName='Helvetica', fontSize=7.5, leading=10, textColor=TEXT_MUTED, alignment=1)
    ))


# ═══════════════════════════════════════════════════════════════
# 1. BUILD TANZANIA REACH SRD / SDD PDF
# ═══════════════════════════════════════════════════════════════
def build_tanzania_reach_srd(output_path):
    doc = SimpleDocTemplate(
        output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54
    )
    styles = get_custom_styles()
    story = []

    append_cover_page(
        story, styles,
        doc_type_title="System Requirements & Technical Architecture Specification (SRD/SDD)",
        doc_badge="HIGHLY TECHNICAL SPECIFICATION",
        description_text="A deep-dive technical blueprint detailing the multi-tier architecture of Tanzania Reach: Next.js 15 App Router, Firebase 11 & Admin SDK, 30-minute ISR live economic data caches, Google Genkit AI assistant integration, and edge bot-blocking security middleware."
    )

    # TOC
    story.append(Paragraph("TABLE OF CONTENTS", styles['h1']))
    story.append(HRFlowable(width="100%", thickness=1, color=DEEP_EMERALD, spaceBefore=4, spaceAfter=8))
    
    toc_entries = [
        ("1.0", "Technical Overview & Technology Matrix", "Full runtime dependencies: Next.js 15, React 19, Firebase 11, Genkit, Tailwind."),
        ("2.0", "System Architecture & Request Topology", "RSC data rendering, 30-minute ISR caching, Cloud Run containers, Edge middleware."),
        ("3.0", "Live Data Aggregation & Economic APIs", "Currency ticker (USD/EUR/GBP to TZS), Open-Meteo weather, World Bank stats."),
        ("4.0", "The 18 Sector Taxonomy & Content Pipeline", "Structured SSG sector guides, named agencies, statutory fees, and legal timelines."),
        ("5.0", "Firebase Authentication & Admin Role Security", "Firestore role-based rules (`owner`, `admin`, `editor`), session cookie guards."),
        ("6.0", "Genkit AI Assistant & Regulatory Knowledge Flow", "Planned Gemini 2.5 regulatory assistant with Tanzania legal knowledge base."),
        ("7.0", "Edge Middleware, Bot Shield & Security Headers", "Scraper blocking, CSP nonces, Permissions-Policy, Rate limiters, and PWA workers."),
        ("8.0", "API Endpoint Specifications & Contracts", "Technical contracts for `/api/live-tz`, `/api/tz-news`, and `/api/visitor-detect`.")
    ]
    
    toc_data = []
    for num, title, desc in toc_entries:
        toc_data.append([
            Paragraph(num, styles['toc_num']),
            Paragraph(f"<b>{title}</b><br/>{desc}", styles['table_cell'])
        ])
    t_toc = Table(toc_data, colWidths=[40, 464])
    t_toc.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, BG_CARD),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 10))

    # SECTION 1
    story.append(Paragraph("1.0 Technical Overview & Technology Matrix", styles['h1']))
    story.append(Paragraph(
        "<b>Tanzania Reach</b> is designed as an ultra-fast, high-availability editorial intelligence portal. "
        "It combines Incremental Static Regeneration (ISR) with real-time economic API polling and Edge bot protection:",
        styles['body']
    ))
    
    tech_data = [
        [Paragraph("Layer", styles['table_header']), Paragraph("Framework / Library", styles['table_header']), Paragraph("System Responsibility", styles['table_header'])],
        [Paragraph("Application Layer", styles['table_cell']), Paragraph("Next.js 15.5.9 (React 19, Turbopack)", styles['table_cell']), Paragraph("React Server Components, SSG sector guides, Edge middleware", styles['table_cell'])],
        [Paragraph("Identity & Auth", styles['table_cell']), Paragraph("Firebase Auth + Session Cookies", styles['table_cell']), Paragraph("Administrative authentication for `/p-access` CMS dashboard", styles['table_cell'])],
        [Paragraph("Database", styles['table_cell']), Paragraph("Firebase Firestore 11.9.1 (Admin 13.1)", styles['table_cell']), Paragraph("Role-guarded content collections (`siteContent`, `analytics`, `users`)", styles['table_cell'])],
        [Paragraph("Live Economic Data", styles['table_cell']), Paragraph("Open-Meteo, Fawaz Ahmed, World Bank", styles['table_cell']), Paragraph("30-minute ISR multi-source live currency, weather & macro stats", styles['table_cell'])],
        [Paragraph("AI Assistant", styles['table_cell']), Paragraph("Genkit 1.28 + Gemini 2.5", styles['table_cell']), Paragraph("Tanzania-tuned investment & regulatory Q&A assistant", styles['table_cell'])],
        [Paragraph("Edge Security", styles['table_cell']), Paragraph("Next.js Middleware + Custom Bot Shield", styles['table_cell']), Paragraph("Blocks automated scrapers (curl, scrapy, python-requests)", styles['table_cell'])],
        [Paragraph("Visual Engine", styles['table_cell']), Paragraph("Framer Motion 12 + GSAP + Three.js", styles['table_cell']), Paragraph("Interactive 3D Cobe Globe, fluid animations, dark/light themes", styles['table_cell'])]
    ]
    t_tech = Table(tech_data, colWidths=[100, 184, 220])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tech)

    story.append(PageBreak())

    # SECTION 2
    story.append(Paragraph("2.0 System Architecture & Request Topology", styles['h1']))
    story.append(Paragraph(
        "The following diagram illustrates the architecture of Tanzania Reach, from edge bot filtering to ISR data hydration:",
        styles['body']
    ))
    
    arch_diag = (
        "┌────────────────────────────────────────────────────────────────────────────────────────────────┐\n"
        "│                           VISITORS & CLIENT BROWSERS (Desktop / Mobile PWA)                    │\n"
        "└───────────────────────────────────────────────┬────────────────────────────────────────────────┘\n"
        "                                                │ (HTTPS / TLS 1.3 via Cloudflare & Firebase)\n"
        "                                                ▼\n"
        "┌────────────────────────────────────────────────────────────────────────────────────────────────┐\n"
        "│                             NEXT.JS 15 EDGE MIDDLEWARE LAYER                                   │\n"
        "│   • Bot Shield: Blocks scrapers (curl, scrapy, wget, python-requests)                           │\n"
        "│   • Admin Route Guard: Validates session cookies for `/p-access` routes                        │\n"
        "│   • Security Headers: Strict CSP, HSTS (2-Year Preload), Permissions-Policy                    │\n"
        "└───────┬───────────────────────────────┬───────────────────────────────┬────────────────────────┘\n"
        "        │                               │                               │\n"
        "        ▼                               ▼                               ▼\n"
        "┌───────────────────────┐   ┌───────────────────────┐   ┌────────────────────────────────────────┐\n"
        "│  18 SECTOR GUIDES     │   │   LIVE DATA PIPELINE  │   │      AI ASSISTANT (GENKIT)             │\n"
        "│  (Static Generation)  │   │  (/api/live-tz - 30m) │   │  ┌──────────────────────────────────┐  │\n"
        "│  • Mining, Energy     │   │  • Currency Ticker    │   │  │ Model: Google Gemini 2.5         │  │\n"
        "│  • Agriculture, Tech  │   │  • Open-Meteo Weather │   │  │ Context: Tanzania Investment Act │  │\n"
        "│  • Tourism, Legal     │   │  • World Bank Stats   │   │  └──────────────────────────────────┘  │\n"
        "└───────────────────────┘   └───────────────────────┘   └────────────────────────────────────────┘\n"
        "                                                │\n"
        "                                                ▼\n"
        "┌────────────────────────────────────────────────────────────────────────────────────────────────┐\n"
        "│                            FIREBASE FIRESTORE & STORAGE PLATFORM                               │\n"
        "│   • Role-Based Security: `owner` (full), `admin` (write), `editor` (drafts)                    │\n"
        "│   • Storage: Watermarked PDF sector downloads & media library                                  │\n"
        "└────────────────────────────────────────────────────────────────────────────────────────────────┘"
    )
    t_ad = Table([[Paragraph(arch_diag.replace(" ", "&nbsp;").replace("\n", "<br/>"), styles['diagram_text'])]], colWidths=[504])
    t_ad.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
        ('BOX', (0,0), (-1,-1), 1, DEEP_EMERALD),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_ad)
    story.append(Spacer(1, 10))

    # SECTION 3 & 4
    story.append(Paragraph("3.0 Live Economic Aggregation & 18 Sector Taxonomies", styles['h1']))
    story.append(Paragraph(
        "<b>A. Live Economic Data Engine (<code>/api/live-tz</code>):</b> Aggregates multi-source real-time metrics with 30-minute ISR caching:<br/>"
        "• <b>Currency Engine:</b> Live TZS conversion rates against USD, EUR, GBP, CNY, KES, and ZAR.<br/>"
        "• <b>Weather Engine:</b> Real-time temperature, humidity, and forecast for Dar es Salaam, Arusha, and Zanzibar.<br/>"
        "• <b>Macro Stats:</b> World Bank GDP growth indicators, inflation trends, and regional trade balances.",
        styles['body']
    ))
    story.append(Spacer(1, 4))
    
    story.append(Paragraph("<b>B. The 18 Comprehensive Sector Guides:</b>", styles['h2']))
    sector_table = [
        [Paragraph("Sector Domain", styles['table_header']), Paragraph("Key Regulatory Agencies Covered", styles['table_header']), Paragraph("Strategic Coverage", styles['table_header'])],
        [Paragraph("Mining & Energy", styles['table_cell']), Paragraph("Mining Commission, EWURA, TPDC", styles['table_cell']), Paragraph("Licensing tiers, local content rules, royalties, gas extraction", styles['table_cell'])],
        [Paragraph("Agriculture", styles['table_cell']), Paragraph("Ministry of Agriculture, TIC, SAGCOT", styles['table_cell']), Paragraph("Land acquisition, export permits, tax incentives, value chain", styles['table_cell'])],
        [Paragraph("Immigration & Visa", styles['table_cell']), Paragraph("Immigration Department, TIC", styles['table_cell']), Paragraph("Class A/B/C Residence Permits, work visas, compliance", styles['table_cell'])],
        [Paragraph("Banking & Finance", styles['table_cell']), Paragraph("Bank of Tanzania (BOT), CMSA, TRA", styles['table_cell']), Paragraph("Forex repatriation, corporate banking, capital markets", styles['table_cell'])],
        [Paragraph("Technology & Telecom", styles['table_cell']), Paragraph("TCRA, COSTECH, e-GA", styles['table_cell']), Paragraph("Data protection compliance, telecom licensing, startup hub", styles['table_cell'])],
        [Paragraph("Tourism & Wildlife", styles['table_cell']), Paragraph("TANAPA, TTB, TAWA, NCAA", styles['table_cell']), Paragraph("Safari concessions, hotel investments, conservation laws", styles['table_cell'])]
    ]
    t_sec = Table(sector_table, colWidths=[120, 180, 204])
    t_sec.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_sec)

    story.append(PageBreak())

    # SECTION 5: AUTH & ROLES
    story.append(Paragraph("4.0 Firebase Auth & Role-Based Security Rules", styles['h1']))
    story.append(Paragraph(
        "The admin portal (<code>/p-access</code>) is protected through a dual-layer security model combining "
        "Next.js middleware session cookies and Firestore security rules:",
        styles['body']
    ))
    
    auth_data = [
        [Paragraph("User Role", styles['table_header']), Paragraph("Access Scope", styles['table_header']), Paragraph("Permissions & Constraints", styles['table_header'])],
        [Paragraph("owner", styles['table_cell']), Paragraph("Full System Control", styles['table_cell']), Paragraph("User role assignment, global settings, monetization configuration", styles['table_cell'])],
        [Paragraph("admin", styles['table_cell']), Paragraph("Content & Media Operations", styles['table_cell']), Paragraph("Publishing articles, editing sector manuals, viewing analytics", styles['table_cell'])],
        [Paragraph("editor", styles['table_cell']), Paragraph("Draft Creation", styles['table_cell']), Paragraph("Authoring content drafts; requires admin approval before publishing", styles['table_cell'])],
        [Paragraph("public", styles['table_cell']), Paragraph("Read-Only (SSG / Cache)", styles['table_cell']), Paragraph("Read-only access to published sector guides and live APIs", styles['table_cell'])]
    ]
    t_auth = Table(auth_data, colWidths=[80, 150, 274])
    t_auth.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_auth)
    story.append(Spacer(1, 10))

    # SECTION 6 & 7: SECURITY & APIS
    story.append(Paragraph("5.0 Edge Middleware Bot Shield & Core API Contracts", styles['h1']))
    story.append(Paragraph(
        "<b>Edge Bot Shield:</b> Protects upstream API rate limits and intellectual property by intercepting automated scrapers at the edge before Next.js page generation:",
        styles['body']
    ))
    
    api_contracts = [
        [Paragraph("Route", styles['table_header']), Paragraph("Method & Runtime", styles['table_header']), Paragraph("Responsibility & Cache Policy", styles['table_header'])],
        [Paragraph("/api/live-tz", styles['table_cell']), Paragraph("GET<br/>Node.js / ISR", styles['table_cell']), Paragraph("Returns live currency rates, weather, and economy stats. Cached for 1800s (30 mins).", styles['table_cell'])],
        [Paragraph("/api/tz-news", styles['table_cell']), Paragraph("GET<br/>ISR Cache", styles['table_cell']), Paragraph("Aggregates and formats headlines from accredited Tanzanian newsrooms.", styles['table_cell'])],
        [Paragraph("/api/visitor-detect", styles['table_cell']), Paragraph("GET<br/>Edge Runtime", styles['table_cell']), Paragraph("Detects if the visitor IP originates within Tanzania to display localized alerts.", styles['table_cell'])],
        [Paragraph("/assistant", styles['table_cell']), Paragraph("POST<br/>Genkit / Gemini", styles['table_cell']), Paragraph("AI assistant answering investment and regulatory questions based on verified sector guides.", styles['table_cell'])]
    ]
    t_api = Table(api_contracts, colWidths=[110, 110, 284])
    t_api.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_api)

    story.append(PageBreak())
    append_back_page(story, styles, "System Requirements & Architecture (SRD/SDD)")
    doc.build(story, canvasmaker=NumberedCanvas)


# ═══════════════════════════════════════════════════════════════
# 2. BUILD TANZANIA REACH PRD PDF
# ═══════════════════════════════════════════════════════════════
def build_tanzania_reach_prd(output_path):
    doc = SimpleDocTemplate(
        output_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54
    )
    styles = get_custom_styles()
    story = []

    append_cover_page(
        story, styles,
        doc_type_title="Executive Product Requirement Document (PRD)",
        doc_badge="OFFICIAL BUSINESS SPECIFICATION",
        description_text="An executive product blueprint presenting Tanzania Reach: the comprehensive economic, legal, and sector intelligence platform designed to eliminate research friction for foreign investors, expatriates, and corporate entities entering Tanzania."
    )

    # TOC
    story.append(Paragraph("TABLE OF CONTENTS", styles['h1']))
    story.append(HRFlowable(width="100%", thickness=1, color=DEEP_EMERALD, spaceBefore=4, spaceAfter=8))
    
    toc_entries = [
        ("1.0", "Executive Vision & Market Opportunity", "Why Tanzania Reach is the definitive gateway for Sub-Saharan Africa's 4th largest economy."),
        ("2.0", "The Problem & The Altraware Solution", "Fragmented government portals vs. unified, verified intelligence."),
        ("3.0", "The 18 Comprehensive Sector Manuals", "Deep-dive regulatory manuals: Mining, Agriculture, Tourism, Banking, Legal, Tech."),
        ("4.0", "Live Economic Intelligence & Tools", "Real-time TZS exchange rates, Dar es Salaam weather, World Bank stats, local news."),
        ("5.0", "Business Model & Monetisation Strategy", "Sponsored content, watermarked PDF downloads, and premium corporate subscriptions."),
        ("6.0", "User Experience & Key Journeys", "Investor journey, expatriate settling journey, and corporate researcher flow."),
        ("7.0", "Current Platform Milestones & Status", "Live beta at www.tanzaniareach.com, PWA offline readiness, dark/light luxury UI."),
        ("8.0", "Horizon Roadmap & Expansion", "Gemini AI assistant integration, interactive tax calculators, verified vendor network.")
    ]
    
    toc_data = []
    for num, title, desc in toc_entries:
        toc_data.append([
            Paragraph(num, styles['toc_num']),
            Paragraph(f"<b>{title}</b><br/>{desc}", styles['table_cell'])
        ])
    t_toc = Table(toc_data, colWidths=[40, 464])
    t_toc.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, BG_CARD),
    ]))
    story.append(t_toc)
    story.append(Spacer(1, 10))

    # SECTION 1 & 2
    story.append(Paragraph("1.0 Executive Vision & Market Opportunity", styles['h1']))
    story.append(Paragraph(
        "<b>Tanzania Reach</b> is the premier digital intelligence portal designed by <b>Altraware Tech</b> "
        "to empower international investors, executives, and expatriates with structured, authoritative clarity "
        "on living, investing, and conducting business in Tanzania. As Sub-Saharan Africa's fourth-largest economy "
        "experiences rapid infrastructure and FDI growth, Tanzania Reach bridges the information gap between "
        "international capital and local regulatory execution.",
        styles['body']
    ))
    story.append(Spacer(1, 4))

    story.append(Paragraph("2.0 Strategic Business Problems Solved", styles['h1']))
    prob_data = [
        [Paragraph("The Old Fragmented Landscape", styles['table_header']), Paragraph("The Tanzania Reach Solution (By Altraware Tech)", styles['table_header'])],
        [
            Paragraph("<b>Information Fragmentation:</b> Over 30 ministries and 90+ agencies with scattered, outdated websites.", styles['table_cell']),
            Paragraph("<b>Unified Sector Hubs:</b> 18 structured sector manuals covering exact agencies, laws, fees, and timelines.", styles['table_cell'])
        ],
        [
            Paragraph("<b>Slow Due Diligence:</b> Basic regulatory research that takes months of physical consultations in Dar es Salaam.", styles['table_cell']),
            Paragraph("<b>Instant Actionable Manuals:</b> Step-by-step guides for company incorporation (BRELA), tax (TRA), and visas (TIC).", styles['table_cell'])
        ],
        [
            Paragraph("<b>Stale Economic Data:</b> Outdated exchange rates and macroeconomic statistics across generic travel blogs.", styles['table_cell']),
            Paragraph("<b>Live 30-Min Data Caching:</b> Real-time currency tickers, local weather, and World Bank economic indicators.", styles['table_cell'])
        ],
        [
            Paragraph("<b>No Interactive AI Guidance:</b> Foreigners struggling to understand local Swahili terminology and procedures.", styles['table_cell']),
            Paragraph("<b>Gemini-Powered AI:</b> Bilingual assistant specialized in Tanzanian business law, cultural etiquette, and phrasebooks.", styles['table_cell'])
        ]
    ]
    t_prob = Table(prob_data, colWidths=[240, 264])
    t_prob.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_prob)

    story.append(PageBreak())

    # SECTION 3 & 4
    story.append(Paragraph("3.0 The 18 Comprehensive Sector Manuals & Tools", styles['h1']))
    story.append(Paragraph(
        "Tanzania Reach organizes complex economic ecosystems into 18 dedicated, easy-to-read sector guides:",
        styles['body']
    ))
    
    sec_data = [
        [Paragraph("Sector Manual", styles['table_header']), Paragraph("Core Information Covered", styles['table_header']), Paragraph("Target Audience", styles['table_header'])],
        [Paragraph("1. Mining & Natural Resources", styles['table_cell']), Paragraph("Mining Commission licensing, local content requirements, royalties, critical minerals.", styles['table_cell']), Paragraph("Mining firms, commodity traders", styles['table_cell'])],
        [Paragraph("2. Agriculture & Agribusiness", styles['table_cell']), Paragraph("Land acquisition for farming, TIC incentives, export permits, irrigation zones.", styles['table_cell']), Paragraph("Agri-funds, commercial farmers", styles['table_cell'])],
        [Paragraph("3. Immigration & Visas", styles['table_cell']), Paragraph("Class A (Investor), Class B (Worker), Class C permits, e-Visa step-by-step.", styles['table_cell']), Paragraph("Expats, HR managers, consultants", styles['table_cell'])],
        [Paragraph("4. Real Estate & Housing", styles['table_cell']), Paragraph("Expat residential zones (Masaki, Oysterbay, Mikocheni), lease laws, commercial property.", styles['table_cell']), Paragraph("Diplomats, relocating families", styles['table_cell'])],
        [Paragraph("5. Corporate & Legal Setup", styles['table_cell']), Paragraph("BRELA company registration, TIN & VAT with TRA, municipal business licensing.", styles['table_cell']), Paragraph("Entrepreneurs, foreign founders", styles['table_cell'])],
        [Paragraph("6. Banking, Forex & Telecom", styles['table_cell']), Paragraph("BOT forex repatriation rules, mobile money (M-Pesa/Tigo Pesa), fiber connectivity.", styles['table_cell']), Paragraph("Financial controllers, digital nomads", styles['table_cell'])]
    ]
    t_sec_prd = Table(sec_data, colWidths=[140, 240, 124])
    t_sec_prd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_sec_prd)
    story.append(Spacer(1, 10))

    # SECTION 5: MONETISATION
    story.append(Paragraph("4.0 Business Model & Monetisation Architecture", styles['h1']))
    story.append(Paragraph(
        "Tanzania Reach is designed for sustainable commercial growth through three high-margin revenue streams:",
        styles['body']
    ))
    
    rev_data = [
        [Paragraph("Revenue Stream", styles['table_header']), Paragraph("Target Customers", styles['table_header']), Paragraph("Monetisation Model", styles['table_header'])],
        [Paragraph("Sponsored Sector Placements", styles['table_cell']), Paragraph("Tier-1 Banks, Law Firms, Relocation Agencies, Safari Lodges", styles['table_cell']), Paragraph("Premium banner & verified partner slots inside specific sector manuals.", styles['table_cell'])],
        [Paragraph("Premium Sector PDF Bundles", styles['table_cell']), Paragraph("Individual Investors, Corporate Due Diligence Teams", styles['table_cell']), Paragraph("Instant downloadable, watermarked comprehensive PDF industry manuals.", styles['table_cell'])],
        [Paragraph("Corporate Intelligence Subscriptions", styles['table_cell']), Paragraph("Multinational Consultancies (McKinsey, PwC, BCG), Embassies", styles['table_cell']), Paragraph("Annual API & intelligence brief subscription for ongoing regulatory updates.", styles['table_cell'])]
    ]
    t_rev = Table(rev_data, colWidths=[150, 160, 194])
    t_rev.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_rev)

    story.append(PageBreak())

    # SECTION 6, 7 & 8
    story.append(Paragraph("5.0 User Experience & Platform Status", styles['h1']))
    story.append(Paragraph(
        "• <b>Live Deployment:</b> Fully active and operational at <code>https://www.tanzaniareach.com</code>.<br/>"
        "• <b>Visual Prestige:</b> Responsive, dark/light theme with luxury typography and 3D interactive Cobe globe.<br/>"
        "• <b>Offline Readiness:</b> PWA service worker enables instant loading even with intermittent mobile connections in remote parks.",
        styles['body']
    ))
    story.append(Spacer(1, 8))

    story.append(Paragraph("6.0 Horizon Roadmap: What Altraware Tech Is Building Next", styles['h1']))
    road_data = [
        [Paragraph("Phase", styles['table_header']), Paragraph("Milestone", styles['table_header']), Paragraph("Strategic Deliverable", styles['table_header'])],
        [Paragraph("Phase 1 (Live)", styles['table_cell']), Paragraph("Core Portal & 18 Sector Guides", styles['table_cell']), Paragraph("18 sector manuals, live currency/weather engine, and `/p-access` admin dashboard.", styles['table_cell'])],
        [Paragraph("Phase 2 (Current)", styles['table_cell']), Paragraph("Genkit AI Assistant Integration", styles['table_cell']), Paragraph("Interactive Gemini AI chat providing instant regulatory answers directly on the website.", styles['table_cell'])],
        [Paragraph("Phase 3 (Upcoming)", styles['table_cell']), Paragraph("Interactive Tax & Duty Calculators", styles['table_cell']), Paragraph("Automated TRA import duty, corporate tax, and withholding tax simulation tools.", styles['table_cell'])],
        [Paragraph("Phase 4 (Expansion)", styles['table_cell']), Paragraph("Verified Professional Marketplace", styles['table_cell']), Paragraph("Curated directory of vetted Tanzanian lawyers, accountants, and safari operators.", styles['table_cell'])]
    ]
    t_rd = Table(road_data, colWidths=[90, 180, 234])
    t_rd.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), DEEP_EMERALD),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_LIGHT]),
        ('PADDING', (0,0), (-1,-1), 4.5),
    ]))
    story.append(t_rd)

    story.append(PageBreak())
    append_back_page(story, styles, "Executive Product Requirements (PRD)")
    doc.build(story, canvasmaker=NumberedCanvas)


if __name__ == '__main__':
    srd_output = os.path.join(DOCS_DIR, "Tanzania_Reach_System_Architecture_and_Design_SRD.pdf")
    prd_output = os.path.join(DOCS_DIR, "Tanzania_Reach_Executive_PRD_Altraware.pdf")
    
    print("=" * 60)
    print("GENERATING TANZANIA REACH OFFICIAL ALTRAWARE TECH PDF SUITE")
    print("=" * 60)
    
    print("\n1. Generating System Requirements & Technical Architecture (SRD)...")
    build_tanzania_reach_srd(srd_output)
    print(f"✓ SRD PDF successfully built: {srd_output}")
    
    print("\n2. Generating Executive Product Requirement Document (PRD)...")
    build_tanzania_reach_prd(prd_output)
    print(f"✓ PRD PDF successfully built: {prd_output}")
    print("=" * 60)
