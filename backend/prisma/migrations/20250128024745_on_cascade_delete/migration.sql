-- DropForeignKey
ALTER TABLE `securityanswers` DROP FOREIGN KEY `SecurityAnswers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `securityanswers` DROP FOREIGN KEY `SecurityAnswers_userId_fkey`;

-- DropIndex
DROP INDEX `SecurityAnswers_questionId_fkey` ON `securityanswers`;

-- DropIndex
DROP INDEX `SecurityAnswers_userId_fkey` ON `securityanswers`;

-- AddForeignKey
ALTER TABLE `SecurityAnswers` ADD CONSTRAINT `SecurityAnswers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SecurityAnswers` ADD CONSTRAINT `SecurityAnswers_questionId_fkey` FOREIGN KEY (`questionId`) REFERENCES `PredefinedQuestions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
