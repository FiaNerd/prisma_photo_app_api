-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(1000) NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `Photo_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Album` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `Album_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlbumToPhoto` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_AlbumToPhoto_AB_unique`(`A`, `B`),
    INDEX `_AlbumToPhoto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Album` ADD CONSTRAINT `Album_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumToPhoto` ADD CONSTRAINT `_AlbumToPhoto_A_fkey` FOREIGN KEY (`A`) REFERENCES `Album`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AlbumToPhoto` ADD CONSTRAINT `_AlbumToPhoto_B_fkey` FOREIGN KEY (`B`) REFERENCES `Photo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
