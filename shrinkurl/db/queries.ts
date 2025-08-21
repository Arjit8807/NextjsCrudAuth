// db/queries.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveUrl(longUrl: string, shortUrl: string, userId?: string) {
    try {
        // We create the base data object.
        const data = {
            longUrl: longUrl,
            shortUrl: shortUrl,
            // We conditionally add the userId to the object only if it exists.
            ...(userId && { userId: userId }),
        };

        const newLink = await prisma.link.create({
            data: data,
        });

        return newLink.id;
    } catch (error) {
        console.error('Error saving URL:', error);
        throw error;
    }
}

export async function getUrl(shortUrl: string) {
    try {
        const link = await prisma.link.findUnique({
            where: {
                shortUrl: shortUrl
            },
            select: {
                longUrl: true
            }
        });
        return link?.longUrl || null;
    } catch (error) {
        console.error('Error getting URL:', error);
        throw error;
    }
}