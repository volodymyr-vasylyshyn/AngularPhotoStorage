module Api::V1
  class AlbumsController < ApiController
    respond_to :json
    before_action :set_album, only: [:show, :edit, :update, :destroy]
    def index
      @albums = Album.all
      render json: @albums
    end

    # GET /albums/1
    # GET /albums/1.json
    def show
      render json: @album
    end

    # GET /albums/new
    def new
      @album = Album.new
    end

    # GET /albums/1/edit
    def edit
    end

    # POST /albums
    # POST /albums.json
    def create
      @album = Album.new(album_params)
      @album.user = current_user
      if @album.save
        render json: @album
      else
        render json: @album.errors
      end
    end

    # PATCH/PUT /albums/1
    # PATCH/PUT /albums/1.json
    def update
      respond_to do |format|
        if @album.update(album_params)
          format.json { head :no_content }
        else
          render json: @album.errors
        end
      end
    end

    # DELETE /albums/1
    # DELETE /albums/1.json
    def destroy
      @album.destroy
      respond_to do |format|
        format.json { head :no_content }
      end
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_album
        @album = Album.find(params[:id])
      end

      # Never trust parameters from the scary internet, only allow the white list through.
      def album_params
        params.require(:album).permit(:title, :user_id)
      end
  end
end
