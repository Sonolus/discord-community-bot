import { readdirSync, readFileSync } from 'fs'
import * as _categoriesMap from './categories.json'

const categoriesMap: Record<string, string[]> = _categoriesMap

const loadJson = <T>(locale: string, filename: string) =>
    JSON.parse(readFileSync(`${__dirname}/${locale}/${filename}.json`, 'utf8')) as T

export const contents = new Map(
    readdirSync(__dirname, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)
        .map((locale) => {
            const index = loadJson<{
                name: string
                message: string
                back: string
                select: string
            }>(locale, 'index')

            const categories = loadJson<Record<string, string>>(locale, 'categories')

            const articles = loadJson<Record<string, { title: string; body: string }>>(
                locale,
                'articles',
            )

            return [
                locale,
                {
                    ...index,
                    categories: new Map(
                        Object.entries(categories).map(([id, title]) => [
                            id,
                            {
                                title,
                                articleIds: categoriesMap[id],
                            },
                        ]),
                    ),
                    articles: new Map(Object.entries(articles)),
                },
            ]
        }),
)
