import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-rusty'
import { render } from 'resumed'
import * as yaml from 'yaml'
import * as pug from 'pug'

try { await fs.mkdir('dist') } catch {}

const resume = yaml.parse(await fs.readFile('resume.yaml', 'utf-8'))
const html = await render(resume, theme)
const index = pug.compileFile('pages/index.pug')({})
await fs.writeFile('dist/index.html', index)
await fs.writeFile('dist/resume.html', html)
await fs.writeFile('dist/resume.json', JSON.stringify(resume))

// create PDF
import puppeteer from 'puppeteer'
const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({
    path: 'dist/resume.pdf',
    format: 'a4',
    margin: {
        top: 50,
        left: 50,
        bottom: 50,
        right: 50,
    },
    printBackground: true,
})
await browser.close()
