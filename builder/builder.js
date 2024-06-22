// Adapted from https://github.com/rbardini/resumed/blob/7d23b743b3c5df2890ff006bedc744c6fe49b166/examples/with-pdf-export/index.js
//
// Copyright (c) 2021 Rafael Bardini
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-stackoverflow'
import puppeteer from 'puppeteer'
import { render } from 'resumed'
import * as yaml from 'yaml'

const resume = yaml.parse(await fs.readFile('resume.yaml', 'utf-8'))
const html = await render(resume, theme)

const browser = await puppeteer.launch()
const page = await browser.newPage()

try { await fs.mkdir('dist') } catch {}
await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ path: 'dist/resume.pdf', format: 'a4', printBackground: true })
await browser.close()
await fs.writeFile('dist/resume.html', html)
await fs.writeFile('dist/resume.json', JSON.stringify(resume))
