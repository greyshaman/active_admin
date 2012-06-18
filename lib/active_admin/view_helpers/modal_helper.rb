module ActiveAdmin
  module ViewHelpers
    module ModalHelper

      def skip_modal!
        @skip_modal = true
      end

      def skip_modal?
        @skip_modal == true
      end

    end
  end
end
