using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateApp.Domain.Models
{
    public class Email
    {
        public string Subject { get; set; } = "";

        public string Body { get; set; } = "";

        public string BodyHtml { get; set; } = "";

        [EmailAddress]
        public string From { get; set; } = "nguyenvantien0620@gmail.com";

        public string FromName { get; set; } = "System";

        [EmailAddress]
        public string To { get; set; } = "";

        public string ToName { get; set; } = "Customer";

    }
}
