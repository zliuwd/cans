# frozen_string_literal: true

require 'rails_helper'

module Infrastructure
  describe QueryParamRemover do
    test_subject = QueryParamRemover.new

    describe '#remove_query_param' do
      it 'returns empty string if url is nil' do
        actual = test_subject.remove_query_param(nil, 'param')
        expect(actual).to eq('')
      end

      it 'returns empty string if url is empty' do
        actual = test_subject.remove_query_param('', 'param')
        expect(actual).to eq('')
      end

      it 'returns same url if param is nil' do
        actual = test_subject.remove_query_param('url', nil)
        expect(actual).to eq('url')
      end

      it 'returns same url if param is empty string' do
        actual = test_subject.remove_query_param('url', '')
        expect(actual).to eq('url')
      end

      it 'returns same url if param is not in the url' do
        input_url = 'http://hi.man?what=isup'
        actual = test_subject.remove_query_param(input_url, 'not_exist')
        expect(actual).to eq(input_url)
      end

      it 'removes query param from url when single param' do
        input_url = 'http://hi.man?what=isup'
        actual = test_subject.remove_query_param(input_url, 'what')
        expect(actual).to eq('http://hi.man')
      end

      it 'removes query param from url when two values for the param' do
        input_url = 'http://hi.man?what=isup&what=isdown'
        actual = test_subject.remove_query_param(input_url, 'what')
        expect(actual).to eq('http://hi.man')
      end

      it 'removes query param from url when two different params' do
        input_url = 'http://hi.man?what=isup&word=up'
        actual = test_subject.remove_query_param(input_url, 'what')
        expect(actual).to eq('http://hi.man?word=up')
      end
    end
  end
end
