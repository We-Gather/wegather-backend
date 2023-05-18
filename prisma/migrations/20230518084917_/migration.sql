-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_school_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `school_id` INTEGER NULL,
    MODIFY `refresh_token` VARCHAR(191) NULL,
    MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_school_id_fkey` FOREIGN KEY (`school_id`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
