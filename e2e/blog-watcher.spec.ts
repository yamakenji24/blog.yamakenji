import { test, expect } from '@playwright/test';

test.describe('VRT on blogs', () => {
    test('has title', async ({ page }) => {
        await page.goto('/');

        await expect(page).toHaveTitle(/yamakenji blog/);
        await expect(page.locator('h1')).toHaveText('yamakenji blog');
        await expect(page).toHaveScreenshot('blog_index_page.png', { threshold: 0, maxDiffPixelRatio: 0.2, fullPage: true });
    });

    test('navigate to programming categories', async ({ page }) => {
        await page.goto('/');

        // 複数のhrefを取得することになるが、機能的には大体一緒なので、最初の要素をクリックする
        await page.locator('a[href*="/category/Programming"]').first().click();        
        await expect(page).toHaveScreenshot('blog_programming_page.png', { threshold: 0, maxDiffPixelRatio: 0.2, fullPage: true });
    });

    test('navigate to blog detail', async ({ page }) => {
        await page.goto('/');

        // 複数のhrefを取得することになるが、機能的には大体一緒なので、最初の要素をクリックする
        await page.locator('a[href*="/blog/"]').first().click();        
        await expect(page).toHaveScreenshot('blog_detail_page.png', { threshold: 0, maxDiffPixelRatio: 0.2, fullPage: true });
    });
});