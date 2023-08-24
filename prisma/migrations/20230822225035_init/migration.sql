-- CreateTable
CREATE TABLE `Club` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('UNION', 'CENTRAL', 'SCHOOL', 'ACADEMY') NOT NULL DEFAULT 'SCHOOL',
    `school_id` INTEGER NOT NULL,
    `introduction` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `poster` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
