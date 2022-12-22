/*
  Warnings:

  - A unique constraint covering the columns `[pokemon_id]` on the table `pokemon` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pokemon_pokemon_id_key" ON "pokemon"("pokemon_id");
