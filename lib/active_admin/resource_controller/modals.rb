module ActiveAdmin
  class ResourceController < BaseController

    module Modals

      protected

      def skip_modal!
        @skip_modal = true
      end

      def skip_modal?
        @skip_modal == true
      end
    end

  end
end
