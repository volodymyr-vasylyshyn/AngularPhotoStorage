class AddPhotosCounterToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :photos_count, :integer, :default => 0
  end
end
