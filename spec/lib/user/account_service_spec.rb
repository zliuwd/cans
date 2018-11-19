# frozen_string_literal: true

require 'spec_helper'

module User
  describe AccountService do
    let(:security_gateway) { instance_double('Infrastructure::SecurityGateway') }
    let(:test_subject) { User::AccountService.new(security_gateway) }

    describe '#get_perry_account' do
      context 'with valid token' do
        it 'returns perry account' do
          token = 'good_token'
          perry_account_mock_string = '{ "staffId": "aa1", "user": "RACFID", "roles": ' \
            '[ "Supervisor" ], "privileges": [ "CANS-staff-person-subordinates-read" ], ' \
            ' "first_name": "Ab", "last_name": "Def", "county_cws_code": "1123", "county_code": ' \
            ' "56", "county_name": "Ventura" }'
          expected_perry_account = '{ "staff_id": "aa1", "first_name": "Ab", "last_name": ' \
          '"Def", "county_name": "Ventura", "privileges": ' \
          '[ "CANS-staff-person-subordinates-read" ] }'
          expected_json = JSON.parse(expected_perry_account, symbolize_names: true)
          allow(security_gateway).to receive(:validate_token)
            .with(token)
            .and_return(perry_account_mock_string)
          expect(test_subject.get_perry_account(token)).to eq expected_json
        end
      end
    end
  end
end
