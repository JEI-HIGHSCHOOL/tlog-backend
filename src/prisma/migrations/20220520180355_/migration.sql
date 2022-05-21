-- CreateTable
CREATE TABLE `Plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place_id` VARCHAR(191) NOT NULL,
    `latitude` INTEGER NOT NULL,
    `longitude` INTEGER NOT NULL,
    `place_phone` VARCHAR(191) NOT NULL,
    `place_category_group_name` VARCHAR(191) NOT NULL,
    `place_address` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `plan_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
