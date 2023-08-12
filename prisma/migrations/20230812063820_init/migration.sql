-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_id` INTEGER NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `class_num` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OAuth_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `provider_type` VARCHAR(191) NOT NULL,
    `provider_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `is_delete` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email_type` VARCHAR(191) NULL,
    `campus` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School_major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `school_id` INTEGER NOT NULL,
    `major_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OutBoxMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` MEDIUMTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OAuth_user` ADD CONSTRAINT `OAuth_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `School_major` ADD CONSTRAINT `School_major_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
