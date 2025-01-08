namespace TemplateApp.Infrastructure.Constants
{
    public class JwtSettings
    {
        public string Issuer { get; set; } = "";

        public string Audience { get; set; } = "";

        public string SecretKey { get; set; } = "";

        public int TokenExpireSeconds { get; set; }

        public int RefreshTokenExpireSeconds { get; set; }

        public bool ValidateIssuer { get; set; } = true;

        public bool ValidateAudience { get; set; } = true;

        public bool ValidateLifetime { get; set; } = true;

        public string RefreshTokenProvider { get; set; } = "";

        public string RefreshToken { get; set; } = "";
    }
}
